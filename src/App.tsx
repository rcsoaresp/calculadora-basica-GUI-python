import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Code2, 
  Play, 
  Layers, 
  Download, 
  CheckCircle2, 
  Sparkles,
  SlidersHorizontal,
  FileCode,
  Github
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { TkinterSimulator } from './components/TkinterSimulator';
import { PythonCodeViewer } from './components/PythonCodeViewer';
import { TkinterAnatomy } from './components/TkinterAnatomy';
import { HowToRunGuide } from './components/HowToRunGuide';
import { CustomizerModal } from './components/CustomizerModal';
import { TkTheme, CalculationHistoryItem, PythonConfig } from './types/calculator';
import { PYTHON_SIMPLE_CODE } from './data/pythonCodes';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('simulator');
  const [theme, setTheme] = useState<TkTheme>('modern_dark');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);

  const [pythonConfig, setPythonConfig] = useState<PythonConfig>({
    windowTitle: 'Calculadora Python Tkinter',
    width: 320,
    height: 420,
    fontSize: 22,
    themeStyle: 'classic',
    enableKeyboardShortcuts: true,
    showHistory: true,
  });

  // Dark mode effect on document.documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddHistory = (item: CalculationHistoryItem) => {
    setHistory(prev => [item, ...prev].slice(0, 30));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDownloadPrimary = () => {
    const blob = new Blob([PYTHON_SIMPLE_CODE], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'calculadora_simples.py');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* Top Bar Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onDownloadPrimary={handleDownloadPrimary}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Python 3.x</span>
              <span aria-hidden="true">·</span>
              <span>Tkinter GUI</span>
              <span aria-hidden="true">·</span>
              <span>4 Operações Básicas: + - × ÷</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
              Calculadora Gráfica com Tkinter em Python
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Interface gráfica completa desenvolvida com a biblioteca nativa <strong>Tkinter</strong>.
              Suporta adição, subtração, multiplicação e divisão com tratamento de divisão por zero, visor dinâmico e código limpo pronto para rodar no seu computador.
            </p>

            {/* Quick Actions Row */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={() => setActiveSection('simulator')}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'simulator'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Simulador Visual Interativo</span>
              </button>

              <button
                onClick={() => setActiveSection('code')}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'code'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Ver Código Python Completo</span>
              </button>

              <button
                onClick={() => setActiveSection('anatomy')}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'anatomy'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Como Funciona o Tkinter</span>
              </button>

              <button
                onClick={() => setActiveSection('guide')}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'guide'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Play className="w-4 h-4" />
                <span>Como Executar Localmente</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section View Routing */}
        {activeSection === 'simulator' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Simulador Visual da Janela Tkinter
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Experimente o comportamento exato da janela Tkinter no navegador com cliques ou pelo seu próprio teclado.
                </p>
              </div>

              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>Personalizar Parâmetros</span>
              </button>
            </div>

            <TkinterSimulator
              theme={theme}
              setTheme={setTheme}
              windowTitle={pythonConfig.windowTitle}
              onAddHistory={handleAddHistory}
              history={history}
              onClearHistory={handleClearHistory}
              onSelectHistoryItem={(val) => {
                // If user clicks a history item, can populate
              }}
            />
          </div>
        )}

        {activeSection === 'code' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Código-Fonte Python (.py)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Códigos testados e prontos para rodar em Python 3 sem necessidade de instalar pacotes externos no Windows/Mac.
                </p>
              </div>

              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>Ajustar Parâmetros</span>
              </button>
            </div>

            <PythonCodeViewer
              customConfig={pythonConfig}
              onOpenCustomizer={() => setIsCustomizerOpen(true)}
            />
          </div>
        )}

        {activeSection === 'anatomy' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Como Funciona a Biblioteca Tkinter
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Guia didático detalhando cada componente do Tkinter utilizado na calculadora.
              </p>
            </div>

            <TkinterAnatomy />
          </div>
        )}

        {activeSection === 'guide' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Guia de Instalação e Execução
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Passo a passo rápido para executar o arquivo <code>calculadora.py</code> no Windows, macOS ou Linux.
              </p>
            </div>

            <HowToRunGuide />
          </div>
        )}

        {/* Feature comparison table */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Resumo das 4 Operações Básicas Implementadas
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-3 font-semibold">Operação</th>
                  <th className="py-2.5 px-3 font-semibold">Símbolo Visual</th>
                  <th className="py-2.5 px-3 font-semibold">Operador Python</th>
                  <th className="py-2.5 px-3 font-semibold">Exemplo</th>
                  <th className="py-2.5 px-3 font-semibold">Tratamento de Exceções</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-sans font-medium text-slate-900 dark:text-white">Adição</td>
                  <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">+</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">+</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">12 + 8 = 20</td>
                  <td className="py-3 px-3 font-sans text-slate-500">Validação padrão</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-sans font-medium text-slate-900 dark:text-white">Subtração</td>
                  <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">-</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">-</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">50 - 15 = 35</td>
                  <td className="py-3 px-3 font-sans text-slate-500">Suporte a números negativos</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-sans font-medium text-slate-900 dark:text-white">Multiplicação</td>
                  <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">×</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">*</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">7 × 6 = 42</td>
                  <td className="py-3 px-3 font-sans text-slate-500">Conversão de '×' para '*' antes do eval</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-sans font-medium text-slate-900 dark:text-white">Divisão</td>
                  <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">÷</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">/</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">100 ÷ 4 = 25</td>
                  <td className="py-3 px-3 font-sans text-rose-600 dark:text-rose-400 font-medium">Captura ZeroDivisionError com mensagem</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-[1340px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span>Calculadora Python Tkinter</span>
            <span>·</span>
            <span>Biblioteca Padrão Tkinter</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <button
              onClick={handleDownloadPrimary}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Baixar Código Python (.py)
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveSection('guide')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Documentação de Execução
            </button>
          </div>
        </div>
      </footer>

      {/* Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={pythonConfig}
        onChangeConfig={setPythonConfig}
      />
    </div>
  );
}
