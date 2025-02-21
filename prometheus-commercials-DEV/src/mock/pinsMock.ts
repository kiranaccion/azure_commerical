import officeData from './apartments.json';

export type Tree = {
  key: string;
  name: string;
  category: string;
  position: google.maps.LatLngLiteral;
};

export type OfficeProperty = {
  site_id: number;
  name: string;
  street_address: string;
  city: string;
  state: string;
  position: google.maps.LatLngLiteral;
  imageSrc: string;
  title: string;
  description: string;
  redirectTo: string;
};

export async function lodasOfficePinsDataset(): Promise<OfficeProperty[]> {
  // simulate loading the trees from an external source
  return new Promise((resolve) => {
    setTimeout(() => {
      const offices = officeData.map((apartment) => ({
        ...apartment,
        position: {
          lat: apartment.lat,
          lng: apartment.long,
        },
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      }));
      resolve(offices as OfficeProperty[]);
    }, 500);
  });
}
