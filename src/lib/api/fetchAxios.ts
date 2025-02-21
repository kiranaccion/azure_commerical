import _ from 'lodash';
import axios from 'axios';
import { urls } from './urlBuilders';

const baseURL: string = process.env.NEXT_PUBLIC_APARTMENTS_HOST || '';

export const axiosClient = axios.create({
  // Set base URL if needed
  baseURL: baseURL,
  // You can add other Axios configurations here
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const fetchLocationData = () => {
  return new Promise((resolve, reject) => {
    axiosClient
      .get(urls['locations'])
      .then((res: any) => {
        if (res?.data) {
          const caApartmentsList: any = [];
          const oaApartmentsList: any = [];
          const saApartmentsList: any = [];

          res.data.items.forEach((apartment: any) => {
            if (apartment.fields.state === 'California') {
              caApartmentsList.push(apartment);
            }
            if (apartment.fields.state === 'Oregon') {
              oaApartmentsList.push(apartment);
            }
            if (apartment.fields.state === 'Washington') {
              saApartmentsList.push(apartment);
            }
          });

          const promApartmentsData: any = {
            ca: {
              apartmentsName: 'California Apartments',
              apartmentsList: [..._.sortBy(caApartmentsList, 'fields.cityName')],
            },
            oa: {
              apartmentsName: 'Oregon Apartments',
              apartmentsList: [..._.sortBy(oaApartmentsList, 'fields.cityName')],
            },
            sa: {
              apartmentsName: 'Washington Apartments',
              apartmentsList: [..._.sortBy(saApartmentsList, 'fields.cityName')],
            },
          };

          resolve(promApartmentsData);
        }
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
