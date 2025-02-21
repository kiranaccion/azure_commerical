export const urls: any = {
  locations: `/contentful?content_type=city&select=fields.cityName,fields.state,fields.stateCode,fields.cityPageSlug`,
  contact: 'contact',

  userExistance: 'contact?email=',
  createUser: 'contact',

  find: 'find',
  autoComplete: 'autocomplete',

  retrieveApartmentName:
    'contentful?content_type=neighborhood&select=fields.stateCode,fields.cityPageSlug,fields.slug&fields.id=',
};

export const fetchUrl = (name: string) => {
  let url: string = '';
  url = process.env.NEXT_PUBLIC_HOST || '';
  if (name) {
    url += urls[name];
  }
  return url;
};
