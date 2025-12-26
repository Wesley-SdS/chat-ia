import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex w-20 ">
      <Image
        src="/images/avatar.png"
        alt="IntelliFlow - Logo do Assistente Inteligente"
        width={80}
        height={80}
        priority
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default Header;
