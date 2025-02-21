export interface PropertyHighlight {
  value: string;
  description?: string;
  key: string;
}

export interface IHighLights {
  highlightsData: PropertyHighlight[];
  highlightSubTitle?: string;
  contactBrokerageCtaLabel?: string;
  contactBrokerageCtaLink: string;
}

export interface Space {
  space: string;
  text: string;
}

export interface AvailableSpace {
  id: number;
  src: string;
  title: string;
  images: {
    src: string;
    id: number;
  }[];
  description: string;
  retailSpaceTobeLeased: Space;
  usableOutdoorSpace: Space;
  floorPlate: Space;
  imageGallery: any;
  name: string;
  contactCta: string;
  details: any;
  key: string;
  value: string;
  fields: any;
}

export interface Tenant {
  name: string;
  icon: string;
  link: string;
  color?: string;
  image: any;
}

export interface Contact {
  title: string;
  loc: string;
  license: string;
}

export interface Conversation {
  contacts: Contact[];
  convoText: string;
  contactInfoText: string;
  getInTouchText: string;
}

export interface Location {
  // Define properties for locations if needed
}

export interface PropertyImages {
  imageSrc: string;
  title: string;
  description: string;
  redirectTo: string;
}

export interface LeasingContact {
  label: string;
  licenseNumber: string;
  phone: string;
  title: string;
  email?: string;
}
export interface PropertyDetails {
  id: string;
  name: string;
  image: string;
  title: string;
  subTitle: string;
  description: string;
  shortDescription: string;
  carouselImages: [];
  heroImageGallery: any;
  highlights: PropertyHighlight[];
  highlightsSubTitle?: string;
  availableSpaces: AvailableSpace[];
  tenants: Tenant[];
  conversation: Conversation;
  locations?: Location[];
  images: PropertyImages[];
  featuredImage: any;
  contactBrokerageCtaLabel: string;
  ourTenents: any;
  ourTenantsLabel: string;
  contactInformation: LeasingContact[];
  contactUsTitle: string;
  contactUsSubtitle: string;
  contactUsCta: string;
  fields: any;
  slug: string;
  showAvailableSpaces?: boolean;
  showTenants?: boolean;
  mapCenter?: { lat: number; lon: number };
  mapZoom?: number;
  contactBrokerageCta: string;
  latLong: { lon: number; lat: number };
  address: string;
  location: string;
  commercialType: 'Office' | 'Retail' | 'Apartments';
  majorTenants?: string[];
  buildingDetails: string[];
  leasingBrochureCta: string;
  leasingBrochureCtaText: string;
}

export interface PropertyPin {
  slug: string;
  position: google.maps.LatLngLiteral;
  imageSrc?: string;
  imageGallery: any[];
  title: string;
  description: string;
  redirectTo: string;
  commercialType: string;
  rank: number;
}
