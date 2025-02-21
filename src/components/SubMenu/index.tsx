'use client';
import { useEffect, useRef, useState } from 'react';
import Chevron from '../SVGs/Chevron';
import HomeIcon from '../SVGs/HomeIcon';
import './styles.scss';
import { usePathname } from 'next/navigation';
import { PropertyDetails } from '@/types';
import Link from 'next/link';
import { Card, CardContent } from '@mui/material';

interface SubMenuProps {
  selectedProperty: PropertyDetails;
}

export default function SubMenu({ selectedProperty }: SubMenuProps) {
  const path = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [menuItems, setMenuItems] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    const segments = path.split('/');

    const items = segments.map((item, index) => {
      if (index === 0 && item === '') {
        return { label: '', href: '/' };
      } else {
        const href = segments.slice(1, index + 1).join('/') || '/';
        return { label: item.replace(/-/g, ' '), href: `/${href}` };
      }
    });

    setMenuItems(items);
  }, [path, selectedProperty]);

  useEffect(() => {
    setIsExpanded(true);
  }, [path]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setCardOpen(false);
      }
    };

    if (cardOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cardOpen]);

  if (menuItems.length === 0) return null;

  return (
    <>
      <div className={`sub-menu sub-menu-sticky ${isExpanded ? 'expanded' : ''}`}>
        <div className="sub-menu-nav">
          <nav>
            <ul className="menu-list">
              {menuItems.map((item, index) => (
                <li key={item.href} className="menu-item">
                  {index === 0 && (
                    <Link href={item.href} className="menu-link" aria-label="Home">
                      <HomeIcon />
                    </Link>
                  )}
                  {index !== 1 && <Chevron />}
                  {item.label !== '' && (
                    <Link href={item.href} className="menu-link" aria-label={item.label}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="sub-menu-mobile-nav">
          <nav>
            <ul className="menu-list">
              <li className="menu-item">
                <Link href={menuItems[0].href} className="menu-link" aria-label="Home">
                  <HomeIcon />
                </Link>
                <Chevron />
              </li>
              <li className="menu-item">
                <span className="menu-link ellipse" style={{ margin: '0 0px 0 0px' }} onClick={() => setCardOpen(true)}>
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
      </div>
    </>
  );
}
