import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Code2, 
  FileCode, 
  Layers, 
  SlidersHorizontal,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { 
  PYTHON_SIMPLE_CODE, 
  PYTHON_OOP_CODE, 
  PYTHON_TTK_CODE, 
  generateCustomPythonCode 
} from '../data/pythonCodes';
import { PythonConfig } from '../types/calculator';

interface PythonCodeViewerProps {
  customConfig: PythonConfig;
  onOpenCustomizer: () => void;
}

export const PythonCodeViewer: React.FC<PythonCodeViewerProps> = ({
  customConfig,
  onOpenCustomizer,
}) => {
  const [activeTab, setActiveTab] = useState<'simple' | 'oop' | 'ttk' | 'custom'>('simple');
  const [copied, setCopied] = useState<boolean>(false);

  const getCode = () => {
    switch (activeTab) {
      case 'simple':
        return PYTHON_SIMPLE_CODE;
      case 'oop':
        return PYTHON_OOP_CODE;
      case 'ttk':
        return PYTHON_TTK_CODE;
      case 'custom':
        return generateCustomPythonCode(customConfig);
      default:
        return PYTHON_SIMPLE_CODE;
    }
  };

  const getFilename = () => {
    switch (activeTab) {
      case 'simple':
        return 'calculadora_simples.py';
      case 'oop':
        return 'calculadora_poo.py';
      case 'ttk':
        return 'calculadora_ttk.py';
      case 'custom':
        return 'calculadora_personalizada.py';
    }
  };

  const currentCode = getCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', getFilename());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Render highlighted Python code with token coloring
  const renderHighlightedCode = (code: string) => {
    const lines = code.trim().split('\n');
    return lines.map((line, idx) => {
      let lineContent: React.ReactNode = line;

      // Simple regex based token coloring for Python
      if (line.trim().startsWith('#')) {
        lineContent = <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{line}</span>;
      } else if (line.trim().startsWith('"""') || line.trim().startsWith("'''") || line.includes('"""')) {
        lineContent = <span className="text-slate-400 dark:text-slate-400 italic">{line}</span>;
      } else {
        // Highlighting for keywords, strings, etc.
        const parts = line.split(/(".*?"|'.*?'|#.*$)/g);
        lineContent = parts.map((part, pIdx) => {
          if (!part) return null;
          if (part.startsWith('#')) {
            return <span key={pIdx} className="text-emerald-600 dark:text-emerald-400">{part}</span>;
          }
          if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
            return <span key={pIdx} className="text-amber-600 dark:text-amber-300">{part}</span>;
          }

          // Replace python keywords
          const words = part.split(/(\b(?:import|from|def|class|return|if|else|elif|try|except|as|in|is|not|and|or|lambda|while|for|with)\b|[=+\-*/×÷(),:\[\]{}])/g);
          return (
            <span key={pIdx}>
              {words.map((w, wIdx) => {
                if (['import', 'from', 'def', 'class', 'return', 'if', 'else', 'elif', 'try', 'except', 'as', 'lambda'].includes(w)) {
                  return <span key={wIdx} className="text-purple-600 dark:text-purple-400 font-bold">{w}</span>;
                }
                if (['in', 'is', 'not', 'and', 'or', 'while', 'for', 'with'].includes(w)) {
                  return <span key={wIdx} className="text-indigo-600 dark:text-indigo-400 font-semibold">{w}</span>;
                }
                if (['True', 'False', 'None'].includes(w)) {
                  return <span key={wIdx} className="text-rose-600 dark:text-rose-400 font-semibold">{w}</span>;
                }
                if (/^\d+(\.\d+)?$/.test(w)) {
                  return <span key={wIdx} className="text-cyan-600 dark:text-cyan-400">{w}</span>;
                }
                if (['tkinter', 'tk', 'ttk', 'messagebox', 'eval', 'isinstance', 'float', 'int', 'len', 'str'].includes(w)) {
                  return <span key={wIdx} className="text-blue-600 dark:text-blue-400">{w}</span>;
                }
                return w;
              })}
            </span>
          );
        });
      }

      return (
        <div key={idx} className="flex hover:bg-slate-800/40 px-2 py-0.5 rounded-sm">
          <span className="w-10 text-right pr-4 text-slate-400 dark:text-slate-600 select-none text-xs font-mono">
            {idx + 1}
          </span>
          <span className="flex-1 font-mono text-xs whitespace-pre text-slate-800 dark:text-slate-200">
            {lineContent}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Code Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        
        {/* Implementation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => setActiveTab('simple')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'simple'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>1. Código Simples (Iniciante)</span>
          </button>

          <button
            onClick={() => setActiveTab('oop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'oop'
                ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Orientado a Objetos (POO)</span>
          </button>

          <button
            onClick={() => setActiveTab('ttk')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'ttk'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>3. Tema ttk (Nativo)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('custom');
              onOpenCustomizer();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'custom'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>4. Personalizado</span>
          </button>
        </div>

        {/* Action Buttons: Copy and Download */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Copiar código Python para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            title={`Baixar arquivo ${getFilename()}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar {getFilename()}</span>
          </button>
        </div>
      </div>

      {/* Code Viewer Container */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        {/* Code Window Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-mono text-slate-400 font-medium">{getFilename()}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-xs">
            <span>Python 3</span>
            <span>·</span>
            <span>Tkinter GUI</span>
          </div>
        </div>

        {/* Highlighted Code Area */}
        <div className="p-3 sm:p-4 overflow-x-auto max-h-[620px] overflow-y-auto scrollbar-thin">
          <div className="min-w-[500px]">
            {renderHighlightedCode(currentCode)}
          </div>
        </div>
      </div>

      {/* Key Concepts Explanatory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-1">
          <div className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Por que usar lambda nos botões?
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            No Tkinter, o parâmetro <code>command</code> espera uma função sem chamá-la imediatamente. O <code>lambda t=texto: inserir(t)</code> cria uma função anônima que só executa quando o usuário clica no botão.
          </p>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-1">
          <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            O papel de tk.StringVar()
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            O <code>StringVar</code> sincroniza automaticamente o estado do Python com o widget <code>tk.Entry</code>. Quando chamamos <code>visor_var.set(...)</code>, o visor da tela atualiza na mesma hora.
          </p>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-1">
          <div className="font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            O Gerenciador grid()
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Organiza os botões em linhas e colunas matematicamente alinhadas, com <code>columnspan=4</code> no visor e <code>weight=1</code> para que todos os botões se expandam com perfeição.
          </p>
        </div>
      </div>
    </div>
  );
};
