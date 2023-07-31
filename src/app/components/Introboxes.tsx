"use client"

import React from "react";
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

const GameStoryBox = ({ box, image }: { box: IIntroBox; image: StaticImageData }) => (
  <div
    key={box.title}
    className="flex flex-row relative md:flex-col items-center cursor-pointer md:max-w-xs px-6 py-4 text-left text-black transition-colors duration-150 shadow-md bg-white hover:text-teal-500"
  >
    <div className="flex relative mb-4 mx-auto min-w-[10rem] p-2 max-h-[10rem] md:max-h-none">
      <Image src={image} alt={box.title} height={200} style={{
        objectFit: "contain",
      }} />

    </div>
    <div className="mb-2 ml-2 md:ml-0">
      <h2 className="text-xl font-semibold ">{box.title}</h2>
      <p className="text-sm font-light mb-4 hover:text-primary">{box.text}</p>
    </div>
    <div className="absolute cursor-pointer right-0 bottom-0 hover:opacity-80">
      <Image src="/arrow_icon.svg" width="40" height="40" alt="go forward" />
    </div>
  </div>
);

export const IntroBoxes = ({ introBoxesData }: IntroBoxesProps) => {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-10 mt-4 mb-8">
      {introBoxesData.map((box, i) =>

        <Link key={i} href={`game/${imagesAndLinks[i].link}`} className="flex items-stretch">
          <GameStoryBox box={box} image={imagesAndLinks[i].image} />
        </Link>

      )}
    </div>
  );
};
