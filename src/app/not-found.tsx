import Error404 from '@/components/E404';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found | Prometheus',
};

export default function NotFound() {
  return <Error404 />;
}
