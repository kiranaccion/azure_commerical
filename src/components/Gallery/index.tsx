'use client';
import { Chevron, HomeIcon, LeftArrowIcon } from '@/components/SVGs';
import { usePathname, useRouter } from 'next/navigation';
import GalleryGrid from './GalleryGrid';
import './styles.scss';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@mui/material';

export default function Gallery({ galleryImages }: any) {
  const router = useRouter();
  const path = usePathname();
  const [cardOpen, setCardOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setCardOpen(false);
      }
    };

    if (cardOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cardOpen]);

  const segments = path.split('/');
  const menuItems = segments.map((item, index) => {
    if (index === 0 && item === '') {
      return { label: '', href: '/' };
    } else {
      const href = segments.slice(1, index + 1).join('/') || '/';
      return { label: item.replace(/-/g, ' '), href: `/${href}` };
    }
  });

  return (
    <>
      <div className="gallery-menu gallery-menu-sticky">
        <div className="gallery-menu-nav">
          <nav>
            <ul className="menu-list">
              {menuItems.map((item, index) => (
                <li key={item.href} className="menu-item">
                  {index === 0 && (
                    <Link href={item.href} aria-label="Home">
                      <HomeIcon />
                    </Link>
                  )}
                  {index !== 1 && <Chevron />}
                  <Link href={item.href} className="menu-link" aria-label={item.label}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="gallery-menu-mobile-nav">
          <nav>
            <ul className="menu-list">
              <li className="menu-item">
                <Link href={menuItems[0].href} className="menu-link" aria-label="Home">
                  <HomeIcon />
                </Link>
                <Chevron />
              </li>
              <li className="menu-item">
                <span className="menu-link ellipse" style={{ margin: '0 10px 0 -10px' }} onClick={() => setCardOpen(true)}>
                  ...
                </span>
                <Chevron />
              </li>
              <li className="menu-item">
                <Link
                  href={menuItems[menuItems.length - 1].href}
                  className="menu-link"
                  aria-label={menuItems[menuItems.length - 1].label}
                >
                  {menuItems[menuItems.length - 1].label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="go-back" onClick={() => router.back()}>
          <LeftArrowIcon />
          <p>Back to {menuItems[1].label}</p>
        </div>

        {cardOpen && (
          <Card className="breadcrumbs-card" ref={cardRef}>
            <CardContent className="card-content">
              {menuItems.slice(1, -1).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="menu-link"
                  onClick={() => setCardOpen(false)}
                  aria-label={item.label}
                >
                  {item.label}
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <GalleryGrid galleryImages={galleryImages} />
    </>
  );
}
