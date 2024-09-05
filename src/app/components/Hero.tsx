import React from "react";

export interface IHero {
  title: string;
  subtitle: string;
  description: string;
}

type Props = {
  heroData: IHero;
};

const Hero = ({ heroData }: Props) => {
  return (
    <section className="py-5 max-w-6xl md:mx-28">
      <h1 className="font-extrabold md:text-center text-gray-900">
        {heroData.title}
      </h1>
      <h2 className="md:text-center">
        {heroData.subtitle}
      </h2>
      <p className="text-gray-500 mt-4">
        {heroData.description}
      </p>
    </section>
  );
};

export default Hero;
