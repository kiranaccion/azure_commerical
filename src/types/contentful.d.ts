// Define the type for the fields in the regHomePage content type

export interface RegHomeItemsFields {
  fields: {
    businessVerticals: any;
    businessVerticalsTitle: string;
    welcomeTitle: string;
    welcomeSubTitle: string;
    welcomeTextDescription: string;
    heroImage: any;
    heroTitle: string;
    heroSubTitle: string;
  };
}
export interface RegHomePageFields {
  title: string;
  description: string;
  image: {
    fields: [
      file: {
        url: string;
      },
    ];
  };
  items: RegHomeItemsFields[];
  businessVerticals: any;
  businessVerticalsTitle: string;
  welcomeTitle: string;
  welcomeSubTitle: string;
  welcomeTextDescription: string;
  heroImage: any;
  heroTitle: string;
  heroSubTitle: string;

  // Add other fields as needed
}

// Define the type for the Contentful entry
export interface RegHomePage {
  contentTypeId: string;
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: RegHomePageFields;
  error: any;
}
