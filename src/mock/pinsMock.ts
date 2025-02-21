import { PropertyPin } from '@/types';
import officeData from './apartments.json';

export async function lodasOfficePinsDataset(): Promise<PropertyPin[]> {
  // simulate loading the trees from an external source
  const commercialTypes = ['office', 'retail', 'apartments'];

  return new Promise((resolve) => {
    setTimeout(() => {
      const offices = officeData.map((apartment, idx) => ({
        ...apartment,
        position: {
          lat: apartment.lat,
          lng: apartment.long,
        },
        imageGallery: [],
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
        commercialType: commercialTypes[idx % commercialTypes.length],
      }));
      resolve(offices as any[]);
    }, 500);
  });
}
