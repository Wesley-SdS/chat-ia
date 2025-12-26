import { FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaNewspaper } from 'react-icons/fa';

export default function Navbar() {
  const socialLinks = {
    instagram: '#',
    github: 'https://github.com/Wesley-SdS',
    youtube: '#',
    articles: '#',
    linkedin: 'https://www.linkedin.com/in/wesley-sds/',
  };

  return (
    <nav className="flex items-center space-x-4" aria-label="Redes sociais">
      <a 
        href={socialLinks.instagram} 
        aria-label="Instagram" 
        className="dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700 transition-colors" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaInstagram size={20} />
      </a>        
      <a 
        href={socialLinks.github} 
        aria-label="Github" 
        className="dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700 transition-colors" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaGithub size={20} />
      </a>
      <a 
        href={socialLinks.youtube} 
        aria-label="Youtube" 
        className="dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700 transition-colors" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaYoutube size={20} />
      </a>
      <a 
        href={socialLinks.articles} 
        aria-label="Artigos" 
        className="dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700 transition-colors" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaNewspaper size={20} />
      </a>
      <a 
        href={socialLinks.linkedin} 
        aria-label="Linkedin" 
        className="dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700 transition-colors" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaLinkedin size={19} />
      </a>
    </nav>
  );
}
