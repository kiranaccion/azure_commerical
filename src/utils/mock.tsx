import MobileFb from '@/components/Icons/MobileFb';
import MobileGlassdoor from '@/components/Icons/MobileGlassdoor';
import MobileInsta from '@/components/Icons/MobileInsta';
import MobileLinkedin from '@/components/Icons/MobileLinkedin';

export const footerQuickLinks = {
  promFooterPages: {
    apartments: {
      title: 'Apartments',
      links: [
        { id: 1, name: 'Contact', linkTo: 'https://prometheusapartments.com/contact' },
        { id: 2, name: 'Help', linkTo: 'https://prometheusapartments.com/help' },
        { id: 3, name: 'Blog', linkTo: 'https://prometheusapartments.com/blog' },
      ],
    },
    commercials: {
      title: 'Office & Retail',
      links: [
        { id: 1, name: 'Office', linkTo: '/office' },
        { id: 2, name: 'Retail', linkTo: '/retail' },
      ],
    },
  },
  promApartmentsStoriesLinks: [
    { id: 1, name: 'Our Story', linkTo: 'https://prometheusapartments.com/our-story' },
    { id: 2, name: 'Our Team', linkTo: 'https://prometheusapartments.com/our-team' },
    { id: 3, name: 'Careers', linkTo: 'https://prometheusapartments.com/careers' },
  ],
  footerPolicies: [
    { id: 1, name: 'Terms & Conditions', linkTo: 'https://prometheusapartments.com/terms' },
    { id: 2, name: 'Privacy Policy', linkTo: 'https://prometheusapartments.com/privacy' },
    { id: 3, name: 'CA Privacy Rights', linkTo: 'https://prometheusapartments.com/privacy/california-privacy-rights' },
    { id: 4, name: 'Online Privacy Portal', linkTo: 'https://prometheusapartments.com/privacy/online-privacy-policy-portal' },
    { id: 5, name: 'Accessibility Policy', linkTo: 'https://prometheusapartments.com/privacy/accessibility' },
    { id: 6, name: 'Sitemap', linkTo: '/sitemap' },
    {
      id: 7,
      name: 'Do Not Sell or Share My Personal Information',
      linkTo: 'https://prometheusapartments.com/privacy/online-privacy-policy-portal',
    },
  ],
  logosList: [
    {
      id: 1,
      logoSrc: '../Facebook.svg',
      altText: 'Facebook',
      socialMediaLink: 'https://www.facebook.com/PrometheusApartments',
      socialMediaSvg: <MobileFb />,
    },
    {
      id: 2,
      logoSrc: '../Linkedin.svg',
      altText: 'Linkedin',
      socialMediaLink: 'https://www.linkedin.com/company/prometheus-real-estate-group',
      socialMediaSvg: <MobileLinkedin />,
    },
    {
      id: 3,
      logoSrc: '../Instagram.svg',
      altText: 'Instagram',
      socialMediaLink: 'https://www.instagram.com/prometheus_apartments',
      socialMediaSvg: <MobileInsta />,
    },
    {
      id: 4,
      logoSrc: '../glassdoor.svg',
      altText: 'Glassdoor',
      socialMediaLink: 'https://www.glassdoor.co.in/Overview/Working-at-Prometheus-Real-Estate-Group-EI_IE363540.11,39.htm',
      socialMediaSvg: <MobileGlassdoor />,
    },
  ],
  apartmentsSearchLinks: {
    ca: 'California',
    oa: 'Oregon',
    sa: 'Washington',
  },
};

export const contactUsQuickLinks = [
  {
    name: 'Privacy Notice',
    refLink: 'https://prometheusapartments.com//privacy/',
  },
  {
    name: 'California Privacy Rights',
    refLink: 'https://prometheusapartments.com//privacy/california-privacy-rights/',
  },
  {
    name: 'Online Privacy Portal',
    refLink: 'https://prometheusapartments.com//privacy/online-privacy-policy-portal/',
  },
  {
    name: 'Accessibility Policy',
    refLink: 'https://prometheusapartments.com//privacy/accessibility/',
  },
];

export const contactUsOptions = [
  {
    label: 'I’m looking for an apartment.',
    value: 'I’m looking for an apartment.',
  },
  {
    label: 'I’m a current neighbor with a question.',
    value: 'I’m a current neighbor with a question.',
  },
  {
    label: 'I have feedback to give.',
    value: 'I have feedback to give.',
  },
  {
    label: 'I’m looking to become a vendor.',
    value: 'I’m looking to become a vendor.',
  },
  {
    label: 'I have a general question.',
    value: 'I have a general question.',
  },
];

export const BCorpPromLink = `https://assets.prometheusapartments.com/m/33a78aa447444935/original/Prometheus_B-Corp-Document_8-5x11in_2024_v3-Spreads.pdf`;

export const siteMapLinks = [
  {
    pageTitle: 'Our Story',
    subPages: [
      {
        pageName: 'Our Story',
        pageLink: 'https://prometheusapartments.com/our-story',
      },
    ],
  },
  // {
  //   pageTitle: 'Neighborhood Portal',
  //   subPages: [
  //     {
  //       pageName: 'Neighbor Login',
  //       pageLink: 'https://prometheusapartments.com/sign-in',
  //     },
  //   ],
  // },
  {
    pageTitle: 'Specials',
    subPages: [
      {
        pageName: 'Specials',
        pageLink: 'https://prometheusapartments.com/specials',
      },
    ],
  },
  {
    pageTitle: 'Careers',
    subPages: [
      {
        pageName: 'Careers',
        pageLink: 'https://prometheusapartments.com/careers',
      },
      {
        pageName: 'Meet the team',
        pageLink: 'https://prometheusapartments.com/our-team',
      },
      {
        pageName: 'Privacy Notice for California Applications',
        pageLink: 'https://prometheusapartments.com/privacy/california-privacy-rights',
      },
      {
        pageName: 'Employee Privacy Policy',
        pageLink: 'https://prometheusapartments.com/employee-privacy-policy',
      },
    ],
  },
  {
    pageTitle: 'Apartments',
    subPages: [
      {
        pageName: 'All Blog Entries',
        pageLink: 'https://prometheusapartments.com/blog',
      },
    ],
  },
  {
    pageTitle: 'Contact Us',
    subPages: [
      {
        pageName: 'Contact Us',
        pageLink: 'https://prometheusapartments.com/contact',
      },
    ],
  },
  {
    pageTitle: 'Help',
    subPages: [
      {
        pageName: 'Help',
        pageLink: 'https://prometheusapartments.com/help',
      },
    ],
  },
];

export const PROM_APARTEMENTS_URL = `https://www.prometheusapartments.com`;
