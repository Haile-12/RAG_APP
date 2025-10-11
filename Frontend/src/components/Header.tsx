import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; // make sure the path is correct

export default function Header() {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `px-3 py-2 rounded-md ${
      location.pathname === path
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    } transition`;

  return (
    <header className="w-full bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-md" />
        <span className="font-semibold text-lg">RAG PDF Assistant</span>
      </div>

      <nav className="flex items-center gap-2">
        <Link to="/" className={linkClasses('/')}>
          Home
        </Link>
        <Link to="/docs" className={linkClasses('/docs')}>
          Docs
        </Link>
        <Link to="/about" className={linkClasses('/about')}>
          About
        </Link>
        <Link to="/app" className={linkClasses('/app')}>
          App
        </Link>
      </nav>
    </header>
  );
}
