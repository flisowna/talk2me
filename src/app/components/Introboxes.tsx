"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import ClimateFoto from "../../../public/image_klima.webp";
import WarFoto from "../../../public/image_ukraine.webp";
import RassismusFoto from "../../../public/image_rassismus.webp";

export interface IIntroBox {
  title: string;
  text: string;
}

const imagesAndLinks = [
  { image: ClimateFoto, link: "climate" },
  { image: WarFoto, link: "war" },
  { image: RassismusFoto, link: "racism" },
]

export interface IntroBoxesProps {
  introBoxesData: Array<IIntroBox>;
}

const GameStoryBox = ({
  box,
  image,
  onClick
}: { box: IIntroBox; image: StaticImageData; onClick?: () => void }) => (
  <div
    key={box.title}
    className="flex max-[440px]:flex-col flex-row relative md:flex-col items-center cursor-pointer md:max-w-xs px-6 py-4 text-left text-black transition-colors duration-150 shadow-md bg-white hover:text-teal-500"
    onClick={onClick}
  >
    <div className="flex relative mb-4 mx-auto min-w-[8rem] md:min-w-[10rem] p-2 max-h-[10rem] md:max-h-none">
      <Image src={image} alt={box.title} height={200} style={{
        objectFit: "contain",
      }} />
    </div>
    <div className="mb-2 ml-2 md:ml-0">
      <h2>{box.title}</h2>
      <p className="font-light mb-4 hover:text-primary">{box.text}</p>
    </div>
    <div className="absolute cursor-pointer right-0 bottom-0 hover:opacity-80">
      <Image src="/arrow_icon.svg" width="40" height="40" alt="go forward" />
    </div>
  </div>
);

export const IntroBoxes = ({ introBoxesData }: IntroBoxesProps) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-row justify-center flex-wrap gap-10 mt-4 mb-8">
        {introBoxesData.map((box, i) => {
          const isRacismCard = imagesAndLinks[i].link === "racism";
          
          return isRacismCard ? (
            <div key={i} className="flex items-stretch" onClick={() => setShowOverlay(true)}>
              <GameStoryBox box={box} image={imagesAndLinks[i].image} />
            </div>
          ) : (
            <Link key={i} href={`game/${imagesAndLinks[i].link}`} className="flex items-stretch">
              <GameStoryBox box={box} image={imagesAndLinks[i].image} />
            </Link>
          );
        })}
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-md text-center flex flex-col items-center justify-center md:w-1/4">
            <h2 className="text-xl font-bold mb-2">Coming Soon</h2>
            <button
              onClick={() => setShowOverlay(false)}
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
