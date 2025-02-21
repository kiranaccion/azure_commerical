'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import './styles.scss';
import { useActiveSection } from '@/hooks';
import { Drawer } from '@mui/material';
import { PropertyDetails } from '@/types';

interface StickyBreadCrumbsProps {
  items: any[];
  property: PropertyDetails;
}

export default function StickyBreadCrumbs({ items, property }: StickyBreadCrumbsProps) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');
  const activeSection = useActiveSection(items);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    };
    // Set initial hash
    handleHashChange();

    // Listen to hash changes
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname, open]);

  const renderLinks = () => {
    return items.map((item) => {
      let isActive = currentHash === item.href || item.id === activeSection;

      return {
        ...item,
        link: (
          <Link href={item.href} key={item.title} className={isActive ? 'active' : ''} aria-label={item.title}>
            {item.title}
          </Link>
        ),
      };
    });
  };

  return (
    <>
      <div className="breadcrumbs-container">
        <div className="breadcrumbs-inner-container">
          <div className="detail-page-sections">
            {renderLinks().map((item) => (
              <div className="section-item" key={item.title}>
                {item.link}
              </div>
            ))}
          </div>

          <div className="view-section">
            {property?.heroImageGallery?.length > 1 && (
              <div className="view-gallery">
                <Link href={`${pathname}/gallery`} aria-label="Gallery">
                  Gallery
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mobile-bottom-drawer">
        <div className="bottom-nav">
          {property?.heroImageGallery?.length > 1 && (
            <div className="view-gallery">
              <Link href={`${pathname}/gallery`} aria-label="Gallery">
                Gallery
              </Link>
            </div>
          )}
        </div>

        <Drawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            style: {
              height: 'fit-content',
              overflowY: 'auto',
              paddingBottom: '20px',
            },
          }}
        >
          <div className="drawer-content">
            <div className="bottom-nav">
              {property?.heroImageGallery?.length > 1 && (
                <div className="view-gallery">
                  <Link href={`${pathname}/gallery`} aria-label="View Gallery">
                    View Gallery
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}
