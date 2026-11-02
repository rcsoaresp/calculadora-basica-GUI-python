import React from 'react';
import { Download } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onDownloadPrimary: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onDownloadPrimary,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          setActiveSection('simulator');
        }}
        className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
        <span>PyTkinter Calc</span>
      </a>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
        <button
          onClick={() => setActiveSection('simulator')}
          className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'simulator' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
          }`}
        >
          Simulador Tkinter
        </button>

        <button
          onClick={() => setActiveSection('code')}
          className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'code' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
          }`}
        >
          Código Python
        </button>

        <button
          onClick={() => setActiveSection('anatomy')}
          className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'anatomy' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
          }`}
        >
          Anatomia Tkinter
        </button>

        <button
          onClick={() => setActiveSection('guide')}
          className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'guide' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
          }`}
        >
          Como Executar
        </button>

        <button
          onClick={() => setActiveSection('readme')}
          className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'readme' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
          }`}
        >
          README.md
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleDarkMode}
          className="p-2 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          title={darkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
          aria-label="Alternar tema"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button
          onClick={onDownloadPrimary}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Baixar .py</span>
        </button>
      </div>
    </header>
  );
};
