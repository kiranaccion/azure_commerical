'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import Logo from '../SVGs/Logo';
import './styles.scss';
// import '../app/_variables.scss'

const links = [
  { name: "Apartments", href: "/" },
  {
    name: "Office",
    href: "/office",
  },
  { name: "Retail", href: "/retail" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="prom-reg-header-container">
      <div className="prom-reg-header">
        <Logo />
      </div>
      <div className="prom-reg-navbar">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`prom-reg-nav-links ${pathname === link.href ? "prom-reg-nav-active-link": ""}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
