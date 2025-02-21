'use client';

import { axiosClient } from '@/lib/api/fetchAxios';
import { fetchContentfulData } from '@/lib/api/fetchContentfulData';
import { urls } from '@/lib/api/urlBuilders';

type SearchMeta = {
  lat: { value: number };
  long: { value: number };
  region: { value: string };
};

type SearchDataItem = {
  propertyType: 'Apartment' | 'Commercials';
  id: string;
  coordinates: [number, number];
};

type SearchResultsData = {
  searchData: SearchDataItem[];
  searchMeta: SearchMeta;
};

export const convertToQuery = (params: { [key: string]: string }): string => {
  if (params.term) {
    return `?q=${encodeURIComponent(params.term)}&filters={}&sort=rank`;
  }

  if (params.boundCoordinates) {
    const [nwLat, seLat, , nwLon, seLon] = decodeURIComponent(params.boundCoordinates).split(':');
    const boundCoordinates = {
      nw: { lat: Number(nwLat), lon: Number(nwLon) },
      se: { lat: Number(seLat), lon: Number(seLon) },
    };
    return `?filters=${JSON.stringify({ boundCoordinates })}&sort=rank`;
  }

  return '';
};

export const fetchCommercials = async (commercials: string[]) => {
  if (commercials.length === 0) return [];

  const propertyPinParams = {
    content_type: 'commercialPropertyPage',
    'fields.slug[in]': commercials.join(','),
    select:
      'fields.slug,fields.address,fields.commercialType,fields.name,fields.latLong,fields.heroImageGallery,fields.carouselImages,fields.description',
  };

  const { items } = await fetchContentfulData(propertyPinParams);

  return items.map(({ fields }: any) => ({
    position: {
      lat: fields.latLong.lat,
      lng: fields.latLong.lon,
    },
    imageSrc: fields.carouselImages ?? '/Prometheus_Logo.webp',
    imageGallery: fields.carouselImages ?? [],
    slug: fields.slug,
    title: fields.name,
    shortDescription: fields.address,
    description: fields.description,
    redirectTo: `/${fields.commercialType?.toLowerCase()}/${fields.slug}`,
    commercialType: fields.commercialType,
  }));
};

export const fetchNeighborhoods = async (apartments: SearchDataItem[]) => {
  if (apartments.length === 0) return [];

  const params = {
    content_type: 'neighborhood',
    select:
      'fields.id,fields.name,fields.summary,fields.cityPageSlug,fields.slug,fields.stateCode,fields.city,fields.state,fields.webContents',
    'fields.id[in]': apartments.map((i) => i.id).join(','),
  };

  try {
    const { data } = await axiosClient.get(`${process.env.NEXT_PUBLIC_APARTMENTS_HOST as string}contentful`, { params });
    return data.items.map(({ fields }: any) => {
      const [lng, lat] = (apartments.find((apt) => fields.id === apt.id) as SearchDataItem).coordinates;
      return {
        position: {
          lat,
          lng,
        },
        imageSrc: fields.webContents.fields?.aboutMainImage,
        imageGallery: fields.webContents.fields?.imageGalleryCarousel,
        id: fields.id,
        slug: fields.slug,
        title: fields.name,
        description: fields?.summary,
        shortDescription: `${fields.city},  ${fields.state}`,
        redirectTo: `${process.env.NEXT_PUBLIC_APARTMENTS_URL}${fields.stateCode}/${fields.cityPageSlug}/${fields.slug}`,
        commercialType: 'Apartments',
      };
    });
  } catch (error) {
    console.error('Error fetching apartments data:', error);
    return [];
  }
};

export const getSearchResults = async (searchParams: { [key: string]: string }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APARTMENTS_HOST}${urls['find']}${convertToQuery(searchParams)}`;
    console.log('Fetching URL:', url);

    const { data }: { data: SearchResultsData } = await axiosClient.get(url);
    const commercialIds: string[] = [];
    const neighborhoodIds: SearchDataItem[] = [];

    data.searchData.forEach((item: SearchDataItem) => {
      if (item.propertyType === 'Commercials') {
        commercialIds.push(item.id);
      } else if (item.propertyType === 'Apartment') {
        neighborhoodIds.push(item);
      }
    });

    const [commercials, neighborhoods] = await Promise.all([
      fetchCommercials(commercialIds),
      fetchNeighborhoods(neighborhoodIds),
    ]);

    if (data.searchMeta) {
      return {
        searchData: [...commercials, ...neighborhoods],
        mapCenter: { lat: data.searchMeta.lat.value, lng: data.searchMeta.long.value },
        zoom: null,
        defaultRegion: data.searchMeta.region?.value === 'default' || false,
      };
    } else {
      const [, , lat, , , lng, zoom]: any = decodeURIComponent(searchParams.boundCoordinates).split(':');

      return {
        searchData: [...commercials, ...neighborhoods],
        mapCenter: { lat: Number(lat), lng: Number(lng) },
        zoom: parseInt(zoom),
        defaultRegion: false,
      };
    }
  } catch (err) {
    console.error('Error fetching search results:', err);
    return { searchData: [], mapCenter: { lat: 0, lng: 0 }, defaultRegion: false };
  }
};
