import React from "react";
import Link from "next/link";
import Image from "next/image";

const socialMediaLinks = [
  { platform: "twitter", link: "https://twitter.com/Talk_to_Me_2020" },
  { platform: "instagram", link: "https://www.instagram.com/talk.to.me.game/" },
  { platform: "facebook", link: "https://www.facebook.com/Talk.To.Me.Game" },
];

const SocialSharingButtons = () => (
  <nav className="text-center flex self-end">
    {socialMediaLinks.map(({ platform, link }) => (
      <a key={platform} href={link} target="_blank"> 
        <div className="flex-1 m-4">
          <Image
            src={`/media/${platform}.svg`}
            alt={platform}
            width="50"
            height="50"
          />
        </div>
      </a>
    ))}
  </nav>
);

export default SocialSharingButtons;
