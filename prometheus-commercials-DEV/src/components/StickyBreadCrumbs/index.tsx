"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./styles.scss";
import { ExpandIcon } from "../SVGs";
import { useActiveSection } from "@/hooks";

interface StickyBreadCrumbsProps {
  items: any[];
}

export default function StickyBreadCrumbs({ items }: StickyBreadCrumbsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentHash, setCurrentHash] = useState("");
  const activeSection = useActiveSection(items);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);
    };

    // Set initial hash
    handleHashChange();

    // Listen to hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname, searchParams]);


  const renderLinks = () => {
    return items.map((item) => {
      const isActive =
        currentHash === item.href && item.id === activeSection
          ? true
          : item.id === activeSection
          ? true
          : false;

      return {
        ...item,
        link: (
          <Link
            href={item.href}
            key={item.title}
            className={isActive ? "active" : ""}
          >
            {item.title}
          </Link>
        ),
      };
    });
  };

  return (
    <div className="breadcrumbs-container">
      <div className="detail-page-sections">
        {renderLinks().map((item) => (
          <div className="section-item" key={item.title}>
            {item.link}
            &nbsp; &nbsp; |
          </div>
        ))}
      </div>

      <div className="view-section">
        <div>View Gallery</div>
        <div className="get-in-touch">
          <p>Get in Touch </p>
          <ExpandIcon />
        </div>
      </div>
    </div>
  );
}
