import { READ_MORE_TEXT } from '@/constants';
import { fetchContentfulData } from '@/lib/api/fetchContentfulData';
import { PropertyPin } from '@/types';
import axios from 'axios';

export const fetchContentfulMiscellaneousData = async () => {
  try {
    const contentfulResponse = await fetchContentfulData({
      content_type: 'commercialMiscellaneous',
    });
    const contentFields = extractFieldsFromContentfulData(contentfulResponse?.items || []);
    return contentFields[0] || {};
  } catch (error) {
    console.error('Error fetching Miscellaneous data:', error);
    return {};
  }
};

export const extractFieldsFromContentfulData = (propertiesData: any) => {
  const propertiesObjData = propertiesData?.map((property: any) => {
    return { ...property.fields };
  });

  return propertiesObjData;
};

export const getDimensionsBy30Percent = (dimension: number, type?: string) => {
  const dimesionBy30 = type !== 'width' ? dimension + dimension * 0.3 : dimension + dimension * 0.5;
  return Math.ceil(dimesionBy30);
};

export const fetchContentfulImage = (data: any, height?: number, width?: number): string => {
  const DEFAULT_QUALITY = 75;

  const extractSource = (data: any): string => {
    if (data?.selectedFile?.url) return data.selectedFile.url;
    if (data?.src) return data.src;
    if (data?.[0]?.selectedFile?.url) return data[0].selectedFile.url;
    if (data?.[0]?.src) return data[0].src;
    return data;
  };

  const appendTransformParams = (src: string, height: number | undefined, width: number | undefined): string => {
    const transformBase = `/transform/`;
    if (!src.includes(transformBase)) return src;

    const [baseUrl, query = ''] = src.split('?');
    const params = query.split('&').reduce((acc: any, pair) => {
      const [key, value] = pair.split('=');
      acc[key] = value;
      return acc;
    }, {});

    if (params['io'] && height && width) {
      if (!params['io'].includes('transform')) params['io'] += ',transform:fill';
      if (!params['io'].includes('width') && !params['io'].includes('height')) {
        params['io'] += `,width:${getDimensionsBy30Percent(width, 'width')},height:${getDimensionsBy30Percent(height)}`;
      }
    }

    params['quality'] = params['quality'] || DEFAULT_QUALITY;

    const updatedParams = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `${baseUrl}?${updatedParams}`;
  };

  const applyDefaultTransform = (src: string, height: number | undefined, width: number | undefined): string => {
    if (src.includes('?')) return src;

    return height && width
      ? `${src}?io=transform:fill,width:${getDimensionsBy30Percent(width, 'width')},height:${getDimensionsBy30Percent(height)}`
      : `${src}?quality=${DEFAULT_QUALITY}`;
  };

  let src = extractSource(data);

  // Handle transformation logic
  src = appendTransformParams(src, height, width);
  src = applyDefaultTransform(src, height, width);

  return src;
};

export const scrollToElement = (element: any) => {
  if (element) {
    const container = element.parentNode;
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const scrollLeft = elementRect.left - containerRect.left - containerRect.width / 2 + elementRect.width / 2;
    const scrollTop = elementRect.top - containerRect.top - containerRect.height / 2 + elementRect.height / 2;

    container.scrollBy({
      left: scrollLeft,
      top: scrollTop,
      behavior: 'smooth',
    });
  }
};

export const createPropertyPinList = async (data: any[], commercialType: string, isProperty: boolean): Promise<PropertyPin[]> => {
  let apartments: PropertyPin[] = [],
    nearbyCommercialsData = [];

  if (isProperty) {
    apartments = await getApartmentsPins(data[0]?.fields?.nearbyApartments || []);
    nearbyCommercialsData = data[0]?.fields?.nearbyCommercialProperties || [];
    data = [...data, ...nearbyCommercialsData];
  }

  const pinsDataSet = data.map((property) => ({
    position: {
      lat: property.fields.latLong.lat,
      lng: property.fields.latLong.lon,
    },
    imageSrc: property.fields.carouselImages ?? '/Prometheus_Logo.webp',
    imageGallery: property.fields.carouselImages ?? [],
    slug: property.fields.slug,
    title: property.fields.name,
    rank: property.fields.rank,
    description: property.fields.description,
    redirectTo: `/${property.fields.commercialType?.toLowerCase() ?? commercialType.toLowerCase()}/${property.fields.slug}`,
    commercialType: property.fields?.commercialType.toLowerCase() ?? commercialType,
  }));

  return [...pinsDataSet, ...apartments];
};

export const getAllApartments = async (): Promise<PropertyPin[]> => {
  const params = {
    content_type: 'neighborhood',
    select:
      'fields.name,fields.summary,fields.cityPageSlug,fields.slug,fields.stateCode,fields.latLong,fields.city,fields.state,fields.webContents',
    skip: 0,
    limit: 20,
  };

  const allItems: any[] = [];
  let hasMoreItems = true;

  try {
    while (hasMoreItems) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APARTMENTS_HOST as string}contentful`, { params });
      const data = response.data;

      if (data.items && data.items.length > 0) {
        allItems.push(...data.items);
        params.skip += params.limit;

        // Stop if we have fetched all available items
        if (data.items.length < params.limit) {
          hasMoreItems = false;
        }
      } else {
        hasMoreItems = false;
      }
    }

    console.log(`Fetched ${allItems.length} items in total.`);
    return createApartmentsPinsData(allItems);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching apartments data:', error.message);
    } else {
      console.error('An unknown error occurred fetching apartments data:', error);
    }
    return [];
  }
};

const getApartmentsPins = async (apartments: string[]): Promise<PropertyPin[]> => {
  if (apartments.length === 0) return [];

  const params = {
    content_type: 'neighborhood',
    select:
      'fields.name,fields.summary,fields.cityPageSlug,fields.slug,fields.stateCode,fields.latLong,fields.city,fields.state,fields.webContents',
    'fields.id[in]': apartments.join(','),
  };

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_APARTMENTS_HOST as string}contentful`, { params });
    return createApartmentsPinsData(response.data.items);
  } catch (error) {
    console.error('Error fetching apartments data:', error);
    return [];
  }
};

const createApartmentsPinsData = (data: any[]): PropertyPin[] => {
  const extData = extractFieldsFromContentfulData(data);
  return extData
    .filter((property: any) => property.latLong) // Filter out items without latLong property
    .map((property: any) => ({
      commercialType: 'Apartments',
      position: {
        lat: property.latLong?.lat,
        lng: property.latLong?.lon,
      },
      imageSrc: property.webContents.fields?.aboutMainImage,
      imageGallery: property.webContents.fields.imageGalleryCarousel,
      slug: property.slug,
      title: property.name,
      description: property.summary,
      shortDescription: `${property.city},  ${property.state}`,
      redirectTo: `${process.env.NEXT_PUBLIC_APARTMENTS_URL}${property.stateCode}/${property.cityPageSlug}/${property.slug}`,
    }));
};

// eslint-disable-next-line
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const NAME_REGEX = new RegExp(/^[A-Z]+$/, 'i');
export const PHONE_REGEX = /^\d{3}(?: ?\d{3} ?\d{4})$/;

export function sendUsAnEmailScrollToView() {
  let StartConversationElement = document.getElementById('startAConversationSection');
  if (StartConversationElement) {
    StartConversationElement.scrollIntoView({ behavior: 'smooth' });
    StartConversationElement.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }
}

export const getBoundCoordinates = (initMap: google.maps.Map) => {
  const bounds: google.maps.LatLngBounds = initMap.getBounds() as google.maps.LatLngBounds;
  let mpDetails: any = null;

  if (initMap && bounds) {
    const { lat, lng, zoom } = getCenter(initMap);
    const aNorth = bounds.getNorthEast().lat();
    const aEast = bounds.getNorthEast().lng();
    const aSouth = bounds.getSouthWest().lat();
    const aWest = bounds.getSouthWest().lng();

    mpDetails = {
      boundCoordinates: {
        nw: { lat: aNorth, lon: aWest },
        se: { lat: aSouth, lon: aEast },
      },
      radius: 1,
      zoom,
      center: { lat, lng },
      boundCoordinatesQuery:
        Number(aNorth) +
        ':' +
        Number(aSouth) +
        ':' +
        Number(lat) +
        ':' +
        Number(aWest) +
        ':' +
        Number(aEast) +
        ':' +
        Number(lng) +
        ':' +
        zoom,
    };
  }
  return mpDetails;
};

export const getCenter = (initMap: google.maps.Map) => {
  const center = initMap?.getCenter() as google.maps.LatLng;
  const { lat, lng } = center;
  const zoom: any = initMap?.getZoom();
  return { lat: lat(), lng: lng(), center, zoom };
};

export const renderCopyRightYears = () => {
  let copyRightDuration = ``;

  const promRegStartingYear = 2025;
  const currentYear = new Date().getFullYear();

  copyRightDuration += promRegStartingYear === currentYear ? promRegStartingYear : `${promRegStartingYear} - ${currentYear}`;

  return `${copyRightDuration}`;
};

export const extractPropertyNameFromSlug = (slugValue: string) => {
  return slugValue.replace(/-/g, ' ');
};

export const gtmEventIds = {
  contactUsEmailCTA: 'contact-us-email-cta',
  contactUsPhoneCTA: 'contact-us-phone-cta',
  emailUsCTA: 'contact-us-cta',
};
