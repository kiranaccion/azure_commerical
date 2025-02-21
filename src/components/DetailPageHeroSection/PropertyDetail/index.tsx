import { RightArrowIcon } from '@/components/SVGs';
import './styles.scss';
import { PropertyDetails } from '@/types';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import { gtmEventIds } from '@/utils';

export default function PropertyDetail({ details }: { details: PropertyDetails }) {
  const splitAddress = (address: string) => {
    const [stateAddress, cityStateZip] = address.split(/,(.+)/); // Split by the first comma
    return { stateAddress, cityStateZip };
  };

  return (
    <div className="property-details">
      {details.name && <div className="property-name">{details.name}</div>}

      {details.address && (
        <div className="address">
          <p className="title">Address</p>
          <p className="content">
            {splitAddress(details.address).stateAddress}
            <br />
            {splitAddress(details.address).cityStateZip}
          </p>
        </div>
      )}

      {details.location && (
        <div className="location">
          <p className="title">Location</p>
          <p className="content">{details.location}</p>
        </div>
      )}

      {details.buildingDetails?.length > 0 && (
        <div className="building-details">
          <p className="title">Building Details</p>
          <div className="content">
            {details.buildingDetails.map((detail) => (
              <p className="content-line" key={detail}>
                {detail}
              </p>
            ))}
          </div>
        </div>
      )}

      {details.majorTenants && details.majorTenants.length > 0 && (
        <div className="major-tenants">
          <p className="title">Major Tenants</p>
          <div className="content">
            {details.majorTenants.map((tenant) => (
              <p className="content-line" key={tenant}>
                {tenant.includes('*') ? (
                  <Tooltip title="Coming soon" arrow placement="right">
                    <span style={{ cursor: 'pointer' }}>{tenant}</span>
                  </Tooltip>
                ) : (
                  tenant
                )}
              </p>
            ))}
          </div>
        </div>
      )}

      {details.contactInformation?.length > 0 && (
        <div className="leasing-contacts">
          <p className="title">Leasing Contacts</p>
          <div className="content">
            {details.contactInformation.map((contact) => (
              <div className="leasing-contact" key={contact.title}>
                {contact.title && <p className="lc-line">{contact.title}</p>}
                {contact.licenseNumber && <p className="lc-line">{contact.licenseNumber}</p>}
                {contact.phone && (
                  <p className="lc-line">
                    <a href={`tel:${contact.phone}`} className="phone-link" id={gtmEventIds.contactUsPhoneCTA}>
                      {contact.phone}
                    </a>
                  </p>
                )}
                {contact.email && (
                  <p className="lc-line lc-email">
                    <a href={`mailto:${contact.email}`} id={gtmEventIds.contactUsEmailCTA}>
                      {contact.email}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {details.leasingBrochureCta && (
        <Link
          href={details.leasingBrochureCta}
          target="_blank"
          rel="noopener noreferrer"
          className="leasing-brochure"
          id={gtmEventIds.emailUsCTA}
        >
          {details.leasingBrochureCtaText ?? 'Leasing brochure'} <RightArrowIcon />
        </Link>
      )}
    </div>
  );
}
