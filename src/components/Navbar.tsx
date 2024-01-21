import { FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaNewspaper } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="flex items-center space-x-4">
      <a href="#" aria-label="Instagram" className="  dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={20} />
      </a>        
      <a href="#" aria-label="Github" className="dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700" target="_blank" rel="noopener noreferrer">
        <FaGithub size={20} />
      </a>
      <a href="#" aria-label="Youtube" className="dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700" target="_blank" rel="noopener noreferrer">
        <FaYoutube size={20} />
      </a>
      <a href="#" aria-label="Artigos" className="dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700" target="_blank" rel="noopener noreferrer">
        <FaNewspaper size={20} />
      </a>
      <a href="#" aria-label="Linkedin" className=" dark:text-teal-600 dark:hover:text-gray-500 text-medium hover:text-orange-700 border-radius" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={19} />
      </a>
    </nav>
  );
}
