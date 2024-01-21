import React from 'react';
import { FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaNewspaper } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="dark:bg-dark dark:text-slate-100 py-4   text-slate-950 text-center">
      <div className="container mx-auto">
        <p className="text-sm">&copy; 2024 Wesley Santos. Todos os direitos reservados.</p>
        <nav className="mt-2">
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="/portfolio" className="hover:text-teal-500">Meu Portfólio</a>
            </li>
            <li>
              <a href="/projetos" className="hover:text-teal-500">Outros Projetos</a>
            </li>
            {/* Adicione mais itens de menu conforme necessário */}
          </ul>
        </nav>
   
      </div>
    </footer>
  );
};

export default Footer;
