'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../SVGs/Logo';
import './styles.scss';
import { useEffect, useRef, useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';
import MuiAutocomplete from '../AutoComplete/Autocomplete';

const links = [
  { name: 'Apartments', href: process.env.NEXT_PUBLIC_APARTMENTS_URL as string },
  {
    name: 'Office',
    href: '/office',
  },
  { name: 'Retail', href: '/retail' },
];

const Header = () => {
  const pathname = usePathname();

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const menuIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuIconRef.current && !menuIconRef.current.contains(event.target as Node)) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setShowSearchBar(false);
      }
    };

    if (showSearchBar) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSearchBar]);

  useEffect(() => {
    if (showMenuOptions) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showMenuOptions]);

  const handleClickAway = (e: any, shouldClose: boolean = false, deviceType?: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (e?.target?.id === '' || e?.target?.name === 'autoComplete') {
      setShowSearchBar(false);
    }
    if (shouldClose) {
      setShowSearchBar(false);
    }
    if (e?.target?.name === undefined) {
      setShowSearchBar(false);
    }
  };

  const onClickHamburgerMenu = () => {
    setShowNavbar(!showNavbar);
    setShowMenuOptions(!showMenuOptions);
  };

  const onClickCloseIcon = () => {
    setShowMenuOptions(false);
    setShowNavbar(!showNavbar);
  };

  const mobileLocations = () => {
    return (
      <>
        <ul className="overlayMenuItemsContainer">
          <Link href={links[0].href} target="_blank" aria-label={links[0].name}>
            <li className="overlayMenuItem" onClick={onClickCloseIcon} role="link" tabIndex={0}>
              {links[0].name}
            </li>
          </Link>
          <hr className="mobileMenuOptionsUnderLine" role="presentation" />
          <Link href="/office" aria-label="office">
            <li className="overlayMenuItem" onClick={onClickCloseIcon} role="link" tabIndex={0}>
              Office
            </li>
          </Link>
          <hr className="mobileMenuOptionsUnderLine" role="presentation" />
          <Link href="/retail" aria-label="Retail">
            <li className="overlayMenuItem" onClick={onClickCloseIcon} role="link" tabIndex={0}>
              Retail
            </li>
          </Link>
          <hr className="mobileMenuOptionsUnderLine" role="presentation" />
        </ul>
      </>
    );
  };

  const generateMobileMenu = () => {
    return (
      <div className="mobileMenuContainer">
        <AnimatePresence>
          {showMenuOptions && (
            <motion.div
              key="menuContainer"
              initial={{ x: '200vw' }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '200vw' }}
              transition={{ exit: { duration: 0.25 } }}
              className={`menuOverlayContainer ${showMenuOptions ? 'overlayOnActive' : ''}`}
              id="mobile_hamburger_menu"
            >
              <hr className="mobileMenuOptionsUnderLine" role="presentation" />
              {mobileLocations()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <header className={`prom-reg-header-container ${pathname.includes('search') ? 'z-index-override' : ''}`}>
      <div className="prom-reg-header">
        <Link href={'/'} aria-label="Prometheus" className="logo">
          <Logo />
        </Link>

        <div className="prom-reg-navbar">
          <div className="prom-nav-container">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href === process.env.NEXT_PUBLIC_APARTMENTS_URL ? '_blank' : undefined}
                className={`prom-reg-nav-links ${pathname.includes(link.href) ? 'prom-reg-nav-active-link' : ''}`}
                aria-label={link.name}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="headerButtonsContainer">
          <div className="menuIcon" ref={menuIconRef}>
            <div className="headerSearchBar">
              {!showSearchBar ? (
                <button
                  className="headerSearchIcon"
                  id="headerMagIcon"
                  onClick={() => {
                    setShowSearchBar(true);
                    setShowMenuOptions(false);
                  }}
                  type="button"
                  aria-label="search"
                >
                  <svg
                    className="headerSearchBar"
                    width="25"
                    height="20"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="headerSearchBar"
                      d="M10.0057 8.80503H9.37336L9.14923 8.58891C9.93368 7.67639 10.4059 6.49171 10.4059 5.20297C10.4059 2.32933 8.07662 0 5.20297 0C2.32933 0 0 2.32933 0 5.20297C0 8.07662 2.32933 10.4059 5.20297 10.4059C6.49171 10.4059 7.67639 9.93368 8.58891 9.14923L8.80503 9.37336V10.0057L12.8073 14L14 12.8073L10.0057 8.80503ZM5.20297 8.80503C3.20983 8.80503 1.60091 7.19611 1.60091 5.20297C1.60091 3.20983 3.20983 1.60091 5.20297 1.60091C7.19611 1.60091 8.80503 3.20983 8.80503 5.20297C8.80503 7.19611 7.19611 8.80503 5.20297 8.80503Z"
                      fill="#212121"
                    />
                  </svg>
                </button>
              ) : (
                <div className="headerSearchContainer">
                  <MuiAutocomplete
                    enableLocations={true}
                    autoFocus={true}
                    page="header"
                    handleClickAway={(e: any, val: any) => handleClickAway(e, val, 'desktop')}
                    setShowSearchBar={setShowSearchBar}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mobileHamburgerMenu" title="">
            <Hamburger
              size={24}
              toggled={showMenuOptions}
              toggle={onClickHamburgerMenu}
              aria-expanded={showMenuOptions}
              aria-controls="mobile_hamburger_menu"
              label="main menu"
            />
          </div>
        </div>
      </div>
      {generateMobileMenu()}
    </header>
  );
};

export default Header;
