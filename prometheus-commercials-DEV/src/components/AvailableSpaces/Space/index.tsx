import { AvailableSpace } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { CONTACT_BROKERAGE_BTN } from "@/constants";

export default function Space({ space }: { space: AvailableSpace }) {
  const [selectedSpaceImage, setSelectedSpaceImage] = useState(space.images[0]);

  return (
    <div className="spaces-contents" key={space.id}>
      <div className="inner-spaces-container">
        <div className="vertical-spaces">
          {space.images
            .filter((spaceImage) => spaceImage.id !== selectedSpaceImage.id)
            .map((spaceImage, index) => (
              <div
                key={index}
                className="vertical-item"
                onClick={() => setSelectedSpaceImage(spaceImage)}
              >
                <Image
                  src={spaceImage.src}
                  width={100}
                  height={100}
                  alt={spaceImage.id.toString()}
                />
              </div>
            ))}
        </div>

        <div className="selected-space">
          <Image
            src={selectedSpaceImage.src}
            width={423}
            height={416}
            alt={space.id.toString()}
          />
        </div>
      </div>

      <div className="space-details">
        <h2 className="space-title">{space.title}</h2>
        <p className="space-info">{space.description}</p>
        <div className="space-stats">
          <div className="space-stat">
            <h3 className="space-stat-header">
              {space.retailSpaceTobeLeased.space}
            </h3>
            <p className="space-stat-para">
              {space.retailSpaceTobeLeased.text}
            </p>
          </div>
          <div className="space-stat">
            <h3 className="space-stat-header">
              {space.usableOutdoorSpace.space}
            </h3>
            <p className="space-stat-para">{space.usableOutdoorSpace.text}</p>
          </div>
          <div className="space-stat">
            <h3 className="space-stat-header">{space.floorPlate.space}</h3>
            <p className="space-stat-para">{space.floorPlate.text}</p>
          </div>
        </div>

        <button className="cta-button">{CONTACT_BROKERAGE_BTN}</button>
      </div>
    </div>
  );
}
