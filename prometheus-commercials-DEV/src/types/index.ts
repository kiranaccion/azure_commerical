export interface PropertyHighlight {
  value: string;
  description: string;
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
  retailSpaceTobeLeased: Space
  usableOutdoorSpace: Space
  floorPlate: Space
}

export interface Tenant {
  name: string;
  icon: string;
  link: string;
  color?: string;
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

export interface PropertyDetails {
  id: string;
  image: string;
  title: string;
  subTitle: string;
  description: string;
  highlights: PropertyHighlight[];
  availableSpaces: AvailableSpace[];
  tenants: Tenant[];
  conversation: Conversation;
  locations?: Location[];
  images: PropertyImages[]
}