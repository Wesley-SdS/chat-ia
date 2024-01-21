import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <div className='flex w-20'>
      <Image
        src="/images/avatar.png" // Caminho relativo ao diretório 'public'
        alt="Avatar Image"
        width={10} // Largura da imagem
        height={10} // Altura da imagem
        layout="responsive" // Torna a imagem responsiva
        objectFit="cover" // Ajusta o comportamento de ajuste da imagem
      />
    </div>
  );
};

export default Header;
