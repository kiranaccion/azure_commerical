export type OfficeCarousalItemType = {
  imageSrc: string;
  title: string;
  description: string;
  redirectTo: string;
};

export const officePageHeroSectionMocks = {
  title: 'Find Lorem Apartments or Your Dream Space',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.",
  image: '/office-hero.png',
};

export const aboutUsMocks = {
  offices: [
    {
      title: 'Office 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
      src: '/office-1.png',
      alt: 'Office 1 image',
    },
    {
      title: 'Office 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
      src: '/office-2.png',
      alt: 'Office 2 image',
    },
  ],
  readMoreText: 'Read More',
};

export const exploreSectionMocks = {
  exploreOffices: [
    {
      title: 'Pacific Northwest',
      description: 'Explore Offices',
      src: '/explore-1.jpeg',
      alt: 'Explore 1 image',
    },
    {
      title: 'Bay Area Peninsula',
      description: 'Explore Offices',
      src: '/explore-2.png',
      alt: 'Explore 1 image',
    },
    {
      title: 'Bay Area South Bay',
      description: 'Explore Offices',
      src: '/explore-3.png',
      alt: 'Explore 1 image',
    },
  ],
};

export const officeDetailPageHeroSectionMocks = {
  title: 'Find Lorem Apartments or Your Dream Space',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.",
  image: '/office-hero.png',
};

export const mockRegionalOffices = [
  {
    image: '/offices/brickline.png',
    title: 'Brickline',
    description: '',
    id: '1',
    subTitle: 'Welcome to Brickline, where unfinished edges and open minds inspire the creations to come.',
    highlights: [
      {
        value: '±65,000 SF',
        description: 'of class a new construction office space in downtown San Mateo',
      },
      {
        value: '±7,500 SF',
        description: 'of retail space remaining to be leased',
      },
      { value: '21,000 SF', description: 'floor plate SF' },
      {
        value: 'THE LAST ±4,200 SF',
        description: 'office space remaining to be leased',
      },
      { value: '±8,500 SF', description: 'useable outdoor space' },
      {
        value: 'RETAIL PARKING',
        description: '+ 255 stalls evenings and weekends',
      },
      { value: '64 LUXURY APARTMENT HOMES', description: 'at brickline flats' },
    ],
    availableSpaces: [
      {
        id: 1,
        src: '/spaces/space-1.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 1',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 2,
        src: '/spaces/space-2.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 2',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 3,
        src: '/spaces/space-3.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 3',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 4,
        src: '/spaces/space-4.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 4',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 5,
        src: '/spaces/space-5.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 5',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
    ],
    tenants: [
      {
        name: 'Company Name 1',
        icon: '/retail.png',
        link: '#',
        color: '#e0f7fa',
      },
      {
        name: 'Company Name 2',
        icon: '/retail.png',
        link: '#',
        color: '#FF9900',
      },
      {
        name: 'Company Name 3',
        icon: '/retail.png',
        link: '#',
        color: '#FFF2F8',
      },
      {
        name: 'Company Name 4',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 5',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 6',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 7',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 8',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
    ],
    conversation: {
      contacts: [
        {
          title: 'Office: Ben Paul',
          loc: '650.401.2123',
          license: 'License #01210872',
        },
        {
          title: 'Office: Pat Yaeger',
          loc: '650.401.2133',
          license: 'License #01452294',
        },
        {
          title: 'Retail: Brendan Walsh',
          loc: '925.627.4272',
          license: 'License #02140273',
        },
        {
          title: 'Office: Chris Homs',
          loc: '650.548.2687',
          license: 'License #01901922',
        },
      ],
      convoText: 'Let’s Start a Conversation',
      contactInfoText: 'For information on Brickline availability, please contact:',
      getInTouchText: 'Get in Touch',
    },
    locations: [],
    images: [
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
    ],
  },
  {
    image: '/offices/brickline.png',
    title: 'Office Building 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue.',
    id: '2',
    subTitle: 'Welcome to Brickline, where unfinished edges and open minds inspire the creations to come.',
    highlights: [
      {
        value: '±65,000 SF',
        description: 'of class a new construction office space in downtown San Mateo',
      },
      {
        value: '±7,500 SF',
        description: 'of retail space remaining to be leased',
      },
      { value: '21,000 SF', description: 'floor plate SF' },
      {
        value: 'THE LAST ±4,200 SF',
        description: 'office space remaining to be leased',
      },
      { value: '±8,500 SF', description: 'useable outdoor space' },
      {
        value: 'RETAIL PARKING',
        description: '+ 255 stalls evenings and weekends',
      },
      { value: '64 LUXURY APARTMENT HOMES', description: 'at brickline flats' },
    ],
    availableSpaces: [
      {
        id: 1,
        src: '/spaces/space-1.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 1',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 2,
        src: '/spaces/space-2.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 2',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 3,
        src: '/spaces/space-3.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 3',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 4,
        src: '/spaces/space-4.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 4',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 5,
        src: '/spaces/space-5.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 5',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
    ],
    tenants: [
      {
        name: 'Company Name 1',
        icon: '/retail.png',
        link: '#',
        color: '#e0f7fa',
      },
      {
        name: 'Company Name 2',
        icon: '/retail.png',
        link: '#',
        color: '#FF9900',
      },
      {
        name: 'Company Name 3',
        icon: '/retail.png',
        link: '#',
        color: '#FFF2F8',
      },
      {
        name: 'Company Name 4',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 5',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 6',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 7',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 8',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
    ],
    conversation: {
      contacts: [
        {
          title: 'Office: Ben Paul',
          loc: '650.401.2123',
          license: 'License #01210872',
        },
        {
          title: 'Office: Pat Yaeger',
          loc: '650.401.2133',
          license: 'License #01452294',
        },
        {
          title: 'Retail: Brendan Walsh',
          loc: '925.627.4272',
          license: 'License #02140273',
        },
        {
          title: 'Office: Chris Homs',
          loc: '650.548.2687',
          license: 'License #01901922',
        },
      ],
      convoText: 'Let’s Start a Conversation',
      contactInfoText: 'For information on Brickline availability, please contact:',
      getInTouchText: 'Get in Touch',
    },
    locations: [],
    images: [
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
    ],
  },
  {
    image: '/offices/brickline.png',
    title: 'Office Building 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue.',
    id: '3',
    subTitle: 'Welcome to Brickline, where unfinished edges and open minds inspire the creations to come.',
    highlights: [
      {
        value: '±65,000 SF',
        description: 'of class a new construction office space in downtown San Mateo',
      },
      {
        value: '±7,500 SF',
        description: 'of retail space remaining to be leased',
      },
      { value: '21,000 SF', description: 'floor plate SF' },
      {
        value: 'THE LAST ±4,200 SF',
        description: 'office space remaining to be leased',
      },
      { value: '±8,500 SF', description: 'useable outdoor space' },
      {
        value: 'RETAIL PARKING',
        description: '+ 255 stalls evenings and weekends',
      },
      { value: '64 LUXURY APARTMENT HOMES', description: 'at brickline flats' },
    ],
    availableSpaces: [
      {
        id: 1,
        src: '/spaces/space-1.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 1',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 2,
        src: '/spaces/space-2.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 2',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 3,
        src: '/spaces/space-3.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 3',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 4,
        src: '/spaces/space-4.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 4',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 5,
        src: '/spaces/space-5.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 5',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
    ],
    tenants: [
      {
        name: 'Company Name 1',
        icon: '/retail.png',
        link: '#',
        color: '#e0f7fa',
      },
      {
        name: 'Company Name 2',
        icon: '/retail.png',
        link: '#',
        color: '#FF9900',
      },
      {
        name: 'Company Name 3',
        icon: '/retail.png',
        link: '#',
        color: '#FFF2F8',
      },
      {
        name: 'Company Name 4',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 5',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 6',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 7',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 8',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
    ],
    conversation: {
      contacts: [
        {
          title: 'Office: Ben Paul',
          loc: '650.401.2123',
          license: 'License #01210872',
        },
        {
          title: 'Office: Pat Yaeger',
          loc: '650.401.2133',
          license: 'License #01452294',
        },
        {
          title: 'Retail: Brendan Walsh',
          loc: '925.627.4272',
          license: 'License #02140273',
        },
        {
          title: 'Office: Chris Homs',
          loc: '650.548.2687',
          license: 'License #01901922',
        },
      ],
      convoText: 'Let’s Start a Conversation',
      contactInfoText: 'For information on Brickline availability, please contact:',
      getInTouchText: 'Get in Touch',
    },
    locations: [],
    images: [
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
    ],
  },
  {
    image: '/offices/brickline.png',
    title: 'Office Building 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue.',
    id: '4',
    subTitle: 'Welcome to Brickline, where unfinished edges and open minds inspire the creations to come.',
    highlights: [
      {
        value: '±65,000 SF',
        description: 'of class a new construction office space in downtown San Mateo',
      },
      {
        value: '±7,500 SF',
        description: 'of retail space remaining to be leased',
      },
      { value: '21,000 SF', description: 'floor plate SF' },
      {
        value: 'THE LAST ±4,200 SF',
        description: 'office space remaining to be leased',
      },
      { value: '±8,500 SF', description: 'useable outdoor space' },
      {
        value: 'RETAIL PARKING',
        description: '+ 255 stalls evenings and weekends',
      },
      { value: '64 LUXURY APARTMENT HOMES', description: 'at brickline flats' },
    ],
    availableSpaces: [
      {
        id: 1,
        src: '/spaces/space-1.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 1',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 2,
        src: '/spaces/space-2.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 2',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 3,
        src: '/spaces/space-3.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 3',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 4,
        src: '/spaces/space-4.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 4',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
      {
        id: 5,
        src: '/spaces/space-5.png',
        images: [
          { src: '/spaces/space-1.png', id: 1 },
          { src: '/spaces/space-2.png', id: 2 },
          { src: '/spaces/space-3.png', id: 3 },
          { src: '/spaces/space-4.png', id: 4 },
          { src: '/spaces/space-5.png', id: 5 },
        ],
        title: 'Office Space 5',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        retailSpaceTobeLeased: {
          space: '±7,500 SF',
          text: 'of retail space remaining to be leased',
        },
        usableOutdoorSpace: {
          space: '+/- 8,500 SF',
          text: 'useable outdoor space',
        },
        floorPlate: {
          space: '21,000 SF',
          text: 'floor plate SF',
        },
      },
    ],
    tenants: [
      {
        name: 'Company Name 1',
        icon: '/retail.png',
        link: '#',
        color: '#e0f7fa',
      },
      {
        name: 'Company Name 2',
        icon: '/retail.png',
        link: '#',
        color: '#FF9900',
      },
      {
        name: 'Company Name 3',
        icon: '/retail.png',
        link: '#',
        color: '#FFF2F8',
      },
      {
        name: 'Company Name 4',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 5',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 6',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 7',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
      {
        name: 'Company Name 8',
        icon: '/retail.png',
        link: '#',
        color: '#e8f5e9',
      },
    ],
    conversation: {
      contacts: [
        {
          title: 'Office: Ben Paul',
          loc: '650.401.2123',
          license: 'License #01210872',
        },
        {
          title: 'Office: Pat Yaeger',
          loc: '650.401.2133',
          license: 'License #01452294',
        },
        {
          title: 'Retail: Brendan Walsh',
          loc: '925.627.4272',
          license: 'License #02140273',
        },
        {
          title: 'Office: Chris Homs',
          loc: '650.548.2687',
          license: 'License #01901922',
        },
      ],
      convoText: 'Let’s Start a Conversation',
      contactInfoText: 'For information on Brickline availability, please contact:',
      getInTouchText: 'Get in Touch',
    },
    locations: [],
    images: [
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
      {
        imageSrc: 'https://assets.prometheusapartments.com/transform/77c54782-d5de-4280-9d02-e9a64159c90d/Benton_02?quality=75',
        title: 'Office Space',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue. Etiam varius lacus vitae convallis semper.',
        redirectTo: '/',
      },
    ],
  },
];

export const officeDetailPageOfficeListMocks = {
  buildings: [
    { image: '/offices/brickline.png', title: 'Brickline', description: '' },
    {
      image: '/offices/brickline.png',
      title: 'Office Building 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue.',
    },
    {
      image: '/offices/brickline.png',
      title: 'Office Building 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue.',
    },
    {
      image: '/offices/brickline.png',
      title: 'Office Building 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue.',
    },
    {
      image: '/offices/brickline.png',
      title: 'Office Building 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue.',
    },
    {
      image: '/offices/brickline.png',
      title: 'Office Building 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue.',
    },
    {
      image: '/offices/brickline.png',
      title: 'Office Building 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue.',
    },
  ],
};

export const officeDetailPageAvailableSpacesMocks = {
  availableSpaces: [
    {
      id: 1,
      src: '/spaces/space-1.png',
      title: 'Office Space 1',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
      retailSpaceTobeLeased: {
        space: '±7,500 SF',
        text: 'of retail space remaining to be leased',
      },
      usableOutdoorSpace: {
        space: '+/- 8,500 SF',
        text: 'useable outdoor space',
      },
      floorPlate: {
        space: '21,000 SF',
        text: 'floor plate SF',
      },
    },
    {
      id: 2,
      src: '/spaces/space-2.png',
      title: 'Office Space 2',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
      retailSpaceTobeLeased: {
        space: '±7,500 SF',
        text: 'of retail space remaining to be leased',
      },
      usableOutdoorSpace: {
        space: '+/- 8,500 SF',
        text: 'useable outdoor space',
      },
      floorPlate: {
        space: '21,000 SF',
        text: 'floor plate SF',
      },
    },
    {
      id: 3,
      src: '/spaces/space-3.png',
      title: 'Office Space 3',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
      retailSpaceTobeLeased: {
        space: '±7,500 SF',
        text: 'of retail space remaining to be leased',
      },
      usableOutdoorSpace: {
        space: '+/- 8,500 SF',
        text: 'useable outdoor space',
      },
      floorPlate: {
        space: '21,000 SF',
        text: 'floor plate SF',
      },
    },
    {
      id: 4,
      src: '/spaces/space-4.png',
      title: 'Office Space 4',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
      retailSpaceTobeLeased: {
        space: '±7,500 SF',
        text: 'of retail space remaining to be leased',
      },
      usableOutdoorSpace: {
        space: '+/- 8,500 SF',
        text: 'useable outdoor space',
      },
      floorPlate: {
        space: '21,000 SF',
        text: 'floor plate SF',
      },
    },
    {
      id: 5,
      src: '/spaces/space-5.png',
      title: 'Office Space 5',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
      retailSpaceTobeLeased: {
        space: '±7,500 SF',
        text: 'of retail space remaining to be leased',
      },
      usableOutdoorSpace: {
        space: '+/- 8,500 SF',
        text: 'useable outdoor space',
      },
      floorPlate: {
        space: '21,000 SF',
        text: 'floor plate SF',
      },
    },
  ],
};

export const tenantsMocks = {
  tenants: [
    {
      name: 'Company Name 1',
      icon: '/retail.png',
      link: '#',
      color: '#e0f7fa',
    },
    {
      name: 'Company Name 2',
      icon: '/retail.png',
      link: '#',
      color: '#FF9900',
    },
    {
      name: 'Company Name 3',
      icon: '/retail.png',
      link: '#',
      color: '#FFF2F8',
    },
    {
      name: 'Company Name 4',
      icon: '/retail.png',
      link: '#',
      color: '#e8f5e9',
    },
    {
      name: 'Company Name 5',
      icon: '/retail.png',
      link: '#',
      color: '#e8f5e9',
    },
    {
      name: 'Company Name 6',
      icon: '/retail.png',
      link: '#',
      color: '#e8f5e9',
    },
    {
      name: 'Company Name 7',
      icon: '/retail.png',
      link: '#',
      color: '#e8f5e9',
    },
    {
      name: 'Company Name 8',
      icon: '/retail.png',
      link: '#',
      color: '#e8f5e9',
    },
  ],
};

export const startAConversationMocks = {
  contacts: [
    {
      title: 'Office: Ben Paul',
      loc: '650.401.2123',
      license: 'License #01210872',
    },
    {
      title: 'Office: Pat Yaeger',
      loc: '650.401.2133',
      license: 'License #01452294',
    },
    {
      title: 'Retail: Brendan Walsh',
      loc: '925.627.4272',
      license: 'License #02140273',
    },
    {
      title: 'Office: Chris Homs',
      loc: '650.548.2687',
      license: 'License #01901922',
    },
  ],
  convoText: 'Let’s Start a Conversation',
  contactInfoText: 'For information on Brickline availability, please contact:',
  getInTouchText: 'Get in Touch',
};

export const galleryImages = [
  { src: '/gallery/gallery-1.png' },
  { src: '/gallery/gallery-2.png' },
  { src: '/gallery/gallery-3.png' },
  { src: '/gallery/gallery-4.png' },
  { src: '/gallery/gallery-5.png' },
  { src: '/gallery/gallery-6.png' },
  { src: '/gallery/gallery-7.png' },
  { src: '/gallery/gallery-8.png' },
  { src: '/gallery/gallery-9.png' },
  { src: '/gallery/gallery-1.png' },
  { src: '/gallery/gallery-2.png' },
  { src: '/gallery/gallery-3.png' },
  { src: '/gallery/gallery-4.png' },
  { src: '/gallery/gallery-5.png' },
  { src: '/gallery/gallery-6.png' },
  { src: '/gallery/gallery-7.png' },
  { src: '/gallery/gallery-8.png' },
  { src: '/gallery/gallery-9.png' },
];

export const propertyDetailsMock = {
  name: 'Brickline',
  address: '555 El Camino Real, San Carlos',
  location: 'At San Carlos Caltrain Station Downtown San Carlos',
  buildingDetails: {
    officeSpace: '30,300 SF Total Office Space',
    retailSpace: '11,800 SF Total Retail Space',
    luxuryApartments: '202 Luxury Apartments',
  },
  majorTenants: 'Simon Kutcher & Partners Trustly, Inc.',
  leasingContacts: {
    title: 'Lockehouse',
    retailContact: {
      name: 'Brendan Walsh',
      license: '02140273',
      location: '935.637.4272',
      email: 'brendan@lockehouse.com',
    },
    officeContact: {
      name: 'Chris Homs',
      license: '01901922',
      location: '650.548.2687',
      email: 'chris@lockehouse.com',
    },
  },
};
