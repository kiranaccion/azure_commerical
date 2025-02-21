import TenantsCarousel from '../TenantsCarousel';
import './styles.scss';
import { tenantsMocks } from '../../mock';
import { Tenant } from '@/types';

export default function Tenants({tenants}: {tenants: Tenant[]}) {
  return (
    <div className="tenants-container" id="OurTenants">
      <h2>Our Tenants</h2>
      <TenantsCarousel tenants={tenants} />
    </div>
  );
}
