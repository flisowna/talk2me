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
    <section className="px-4 py-5 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 sm:text-5xl md:text-6xl">
        {heroData.title}
      </h1>
      <h2 className="text-xl text-center text-gray-500 mt-4 sm:text-2xl md:text-3xl">
        {heroData.subtitle}
      </h2>
      <p className="text-lg text-center text-gray-500 mt-6">
        {heroData.description}
      </p>
    </section>
  );
};

export default Hero;
