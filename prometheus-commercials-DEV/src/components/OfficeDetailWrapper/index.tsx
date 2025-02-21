"use client";
import AvailableSpaces from "../AvailableSpaces";
import GMapDetailWrapper from "../GMapDetailWrapper";
import Highlights from "../Highlights";
import OfficeHeroCarousal from "../OfficeHeroCarousal";
import StartConversation from "../StartConversation";
import SubMenu from "../SubMenu";
import Tenants from "../Tenants";
import { useEffect, useState } from "react";
import { PropertyDetails } from "@/types";

interface OfficeDetailsWrapperProps {
  propertyList: PropertyDetails[];
}

export default function OfficeDetailsWrapper({
  propertyList,
}: OfficeDetailsWrapperProps) {
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyDetails | null>(null);

  useEffect(() => {
    setSelectedProperty(propertyList[0]);
  }, [propertyList]);

  if(!selectedProperty) return null;

  return (
    <>
      <SubMenu
        properties={propertyList}
        selectedProperty={selectedProperty}
        setSelectedProperty={setSelectedProperty}
      />
      <OfficeHeroCarousal property={selectedProperty}/>
      <Highlights highlightsData={selectedProperty.highlights}/>
      <AvailableSpaces availableSpaces={selectedProperty.availableSpaces}/>
      <Tenants tenants={selectedProperty.tenants}/>
      <StartConversation {...selectedProperty.conversation} />
      {/* <GMapDetailWrapper
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}
        pins={pins}
        defaultPin={pins[5] as OfficeProperty}
      /> */}
    </>
  );
}
