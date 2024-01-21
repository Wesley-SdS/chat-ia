import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex w-20 ">
      <Image
        src="/images/avatar.png"
        alt="Imagem do Avatar"
        role="img"
        width={80}
        height={80}
        layout="responsive"
        objectFit="cover"
      />
    </div>
  );
};

export default Header;
