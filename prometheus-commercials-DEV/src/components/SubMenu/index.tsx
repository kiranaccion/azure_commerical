"use client";
import { useEffect, useState } from "react";
import Chevron from "../SVGs/Chevron";
import ExpandIcon from "../SVGs/ExpandIcon";
import HomeIcon from "../SVGs/HomeIcon";
import "./styles.scss";
import CollapseIcon from "../SVGs/CollapseIcon";
import OfficeList from "../OfficeList";
import StickyBreadCrumbs from "../StickyBreadCrumbs";
import { usePathname } from "next/navigation";
import { PropertyDetails } from "@/types";

const breadcrumbsItems = [
  {
    id: "AboutUs",
    title: "About Us",
    href: "#AboutUS",
  },
  {
    id: "Highlights",
    title: "Highlights",
    href: "#Highlights",
  },
  {
    id: "AvailableSpaces",
    title: "Available Spaces",
    href: "#AvailableSpaces",
  },
  {
    id: "OurTenants",
    title: "Our Tenants",
    href: "#OurTenants",
  },
  {
    id: "Maps",
    title: "Maps",
    href: "#Maps",
  },
];

interface SubMenuProps {
  properties: PropertyDetails[];
  selectedProperty: PropertyDetails;
  setSelectedProperty: (property: PropertyDetails) => void;
}

export default function SubMenu({
  properties,
  selectedProperty,
  setSelectedProperty,
}: SubMenuProps) {
  const path = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuItems, setMenuItems] = useState<{ label: string; href: string }[]>([]);


  useEffect(() => {
    const segments = path.split("/");
    const items = segments.map((item, index) => {
      if (index === 0 && item === "") {
        return { label: "Home", href: "/" };
      } else {
        const href = segments.slice(1, index + 1).join("/") || "/";
        return { label: item, href: `/${href}` };
      }
    });

    if (selectedProperty) {
      items.push({ label: selectedProperty.title, href: '' });
    }

    setMenuItems(items);
  }, [path, selectedProperty]);

  return (
    <div className="sub-menu sub-menu-sticky">
      <div className="sub-menu-nav">
        <nav>
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="menu-item">
                {index === 0 && <HomeIcon />}
                {index !== 0 && <Chevron />}
                <a href={item.href} className="menu-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="more-properties">
          <p>More Properties</p>
          <div
            className="expand-icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {!isExpanded ? <ExpandIcon /> : <CollapseIcon />}
          </div>
        </div>
      </div>

      <div className="office-list">
        {isExpanded && (
          <OfficeList
            properties={properties}
            selectedProperty={selectedProperty}
            setSelectedProperty={setSelectedProperty}
          />
        )}
      </div>

      <StickyBreadCrumbs items={breadcrumbsItems} />
    </div>
  );
}
