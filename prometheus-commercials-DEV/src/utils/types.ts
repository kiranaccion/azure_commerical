export type NextLinkType = React.ForwardRefExoticComponent<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/sort-type-constituents
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, any> &
    React.RefAttributes<HTMLAnchorElement> & {
      children?: React.ReactNode;
    } & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      href: any;
      className?: string;
      prefetch?: boolean;
    }
>;

export type OfficeProperty = {
  site_id: number;
  name: string;
  street_address: string;
  city: string;
  state: string;
  position: any;
  imageSrc: string;
  title: string;
  description: string;
  redirectTo: string;
};

export interface HeaderData {
  name: string;
  href: string;
  isActive?: boolean;
}
