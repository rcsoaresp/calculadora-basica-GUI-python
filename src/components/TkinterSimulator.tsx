import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  History, 
  RotateCcw, 
  Keyboard, 
  Sparkles,
  Info,
  Laptop
} from 'lucide-react';
import { TkTheme, CalculationHistoryItem } from '../types/calculator';
import { playKeyClick } from '../utils/sound';

interface TkinterSimulatorProps {
  theme: TkTheme;
  setTheme: (theme: TkTheme) => void;
  windowTitle?: string;
  onAddHistory: (item: CalculationHistoryItem) => void;
  history: CalculationHistoryItem[];
  onClearHistory: () => void;
  onSelectHistoryItem: (result: string) => void;
}

export const TkinterSimulator: React.FC<TkinterSimulatorProps> = ({
  theme,
  setTheme,
  windowTitle = "Calculadora Python Tkinter",
  onAddHistory,
  history,
  onClearHistory,
  onSelectHistoryItem,
}) => {
  const [display, setDisplay] = useState<string>('0');
  const [subDisplay, setSubDisplay] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showInspector, setShowInspector] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [showHistoryPanel, setShowHistoryPanel] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSound = useCallback((type: 'num' | 'op' | 'enter' | 'clear' = 'num') => {
    if (soundEnabled) {
      playKeyClick(type);
    }
  }, [soundEnabled]);

  // Insert digit or dot
  const handleDigit = useCallback((digit: string) => {
    handleSound('num');
    setDisplay(prev => {
      if (prev === '0' || prev.includes('Erro')) {
        return digit === '.' ? '0.' : digit;
      }
      if (digit === '.') {
        // Find current number segment
        const parts = prev.split(/[+\-×÷]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) return prev;
      }
      return prev + digit;
    });
  }, [handleSound]);

  // Insert operator
  const handleOperator = useCallback((op: string) => {
    handleSound('op');
    setDisplay(prev => {
      if (prev.includes('Erro')) return '0';
      const lastChar = prev.trim().slice(-1);
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        return prev.slice(0, -1) + op;
      }
      return prev + op;
    });
  }, [handleSound]);

  // Clear all
  const handleClear = useCallback(() => {
    handleSound('clear');
    setDisplay('0');
    setSubDisplay('');
  }, [handleSound]);

  // Clear entry
  const handleClearEntry = useCallback(() => {
    handleSound('clear');
    setDisplay('0');
  }, [handleSound]);

  // Backspace
  const handleBackspace = useCallback(() => {
    handleSound('clear');
    setDisplay(prev => {
      if (prev.includes('Erro') || prev.length <= 1) {
        return '0';
      }
      return prev.slice(0, -1);
    });
  }, [handleSound]);

  // Invert sign
  const handleToggleSign = useCallback(() => {
    handleSound('op');
    setDisplay(prev => {
      if (prev === '0' || prev.includes('Erro')) return prev;
      try {
        // If it's a simple number
        if (!/[+\-×÷]/.test(prev.replace(/^-/, ''))) {
          if (prev.startsWith('-')) {
            return prev.slice(1);
          }
          return '-' + prev;
        }
        return prev;
      } catch {
        return prev;
      }
    });
  }, [handleSound]);

  // Calculate result
  const handleCalculate = useCallback(() => {
    handleSound('enter');
    if (!display || display.includes('Erro')) return;

    const exprVisual = display;
    const exprPython = display.replace(/×/g, '*').replace(/÷/g, '/');

    try {
      // Check division by zero directly
      if (/\/0(?![0-9.])/.test(exprPython)) {
        setSubDisplay(`${exprVisual} =`);
        setDisplay('Erro: Divisão por 0');
        return;
      }

      // Safe mathematical evaluation (basic arithmetic: numbers, +, -, *, /, .)
      if (!/^[\d+\-*/. ()]+$/.test(exprPython)) {
        setDisplay('Erro de Sintaxe');
        return;
      }

      // eslint-disable-next-line no-new-func
      const calcResult = Function(`"use strict"; return (${exprPython})`)();

      if (typeof calcResult !== 'number' || isNaN(calcResult) || !isFinite(calcResult)) {
        setSubDisplay(`${exprVisual} =`);
        setDisplay('Erro: Indefinido');
        return;
      }

      let formattedResult: string;
      if (Number.isInteger(calcResult)) {
        formattedResult = calcResult.toString();
      } else {
        // Format to max 8 decimal places and strip trailing zeros
        formattedResult = parseFloat(calcResult.toFixed(8)).toString();
      }

      setSubDisplay(`${exprVisual} =`);
      setDisplay(formattedResult);

      // Add to history
      onAddHistory({
        id: Date.now().toString(),
        expression: exprVisual,
        result: formattedResult,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
    } catch {
      setSubDisplay(`${exprVisual} =`);
      setDisplay('Erro de Sintaxe');
    }
  }, [display, handleSound, onAddHistory]);

  // Physical Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key;

      if (key >= '0' && key <= '9') {
        e.preventDefault();
        setActiveKey(key);
        handleDigit(key);
      } else if (key === '.' || key === ',') {
        e.preventDefault();
        setActiveKey('.');
        handleDigit('.');
      } else if (key === '+') {
        e.preventDefault();
        setActiveKey('+');
        handleOperator('+');
      } else if (key === '-') {
        e.preventDefault();
        setActiveKey('-');
        handleOperator('-');
      } else if (key === '*') {
        e.preventDefault();
        setActiveKey('×');
        handleOperator('×');
      } else if (key === '/') {
        e.preventDefault();
        setActiveKey('÷');
        handleOperator('÷');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        setActiveKey('=');
        handleCalculate();
      } else if (key === 'Backspace') {
        e.preventDefault();
        setActiveKey('⌫');
        handleBackspace();
      } else if (key === 'Escape' || key === 'Delete') {
        e.preventDefault();
        setActiveKey('C');
        handleClear();
      }

      const timer = setTimeout(() => setActiveKey(null), 150);
      return () => clearTimeout(timer);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleOperator, handleCalculate, handleBackspace, handleClear]);

  // Theme styling definitions
  const themeStyles = {
    classic: {
      windowBg: 'bg-[#d4d0c8]',
      titleBarBg: 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white',
      titleBarText: 'text-white font-bold',
      windowBorder: 'border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] shadow-xl',
      displayBg: 'bg-white text-black font-mono border-2 border-t-[#404040] border-l-[#404040] border-b-white border-r-white',
      displaySub: 'text-gray-500',
      btnNum: 'bg-[#d4d0c8] text-black font-bold border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white',
      btnOp: 'bg-[#d4d0c8] text-[#000080] font-bold border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white',
      btnEq: 'bg-[#d4d0c8] text-[#800000] font-bold border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white',
      btnClear: 'bg-[#d4d0c8] text-[#800000] font-bold border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040]',
      gridPadding: 'p-3 gap-2',
      badge: 'Classic Tk 8.6',
    },
    modern_dark: {
      windowBg: 'bg-[#181825]',
      titleBarBg: 'bg-[#11111b] text-slate-300 border-b border-[#313244]',
      titleBarText: 'text-slate-200 font-medium',
      windowBorder: 'border border-[#313244] shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/5',
      displayBg: 'bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-lg shadow-inner',
      displaySub: 'text-[#9399b2]',
      btnNum: 'bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] active:bg-[#585b70] rounded-lg transition-colors font-semibold',
      btnOp: 'bg-[#89b4fa] text-[#11111b] hover:bg-[#b4befe] active:bg-[#74c7ec] rounded-lg transition-colors font-bold shadow-sm',
      btnEq: 'bg-[#a6e3a1] text-[#11111b] hover:bg-[#94e2d5] active:bg-[#89dceb] rounded-lg transition-colors font-bold shadow-sm',
      btnClear: 'bg-[#f38ba8] text-[#11111b] hover:bg-[#eba0ac] active:bg-[#e78284] rounded-lg transition-colors font-bold',
      gridPadding: 'p-4 gap-2.5',
      badge: 'CustomTkinter Dark',
    },
    clean_light: {
      windowBg: 'bg-[#f8fafc]',
      titleBarBg: 'bg-white text-slate-700 border-b border-slate-200',
      titleBarText: 'text-slate-800 font-semibold',
      windowBorder: 'border border-slate-300 shadow-xl rounded-xl overflow-hidden',
      displayBg: 'bg-white text-slate-900 border border-slate-200 rounded-lg shadow-sm',
      displaySub: 'text-slate-400',
      btnNum: 'bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100 border border-slate-200 rounded-lg shadow-xs font-semibold',
      btnOp: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs font-bold',
      btnEq: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs font-bold',
      btnClear: 'bg-rose-100 text-rose-700 hover:bg-rose-200 active:bg-rose-300 border border-rose-200 rounded-lg font-bold',
      gridPadding: 'p-4 gap-2.5',
      badge: 'Modern ttk Light',
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className="flex flex-col gap-4">
      {/* Simulation Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 rounded-md border border-blue-200/50 dark:border-blue-900/50">
            <Laptop className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Simulador Tkinter Ativo</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>·</span>
            <span>Tkinter 8.6</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Keyboard className="w-3 h-3" />
              Teclado habilitado
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-md transition-colors"
            title={soundEnabled ? "Desativar som dos botões" : "Ativar som dos botões"}
            aria-label="Alternar som"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Tkinter Code Inspector toggle */}
          <button
            onClick={() => setShowInspector(!showInspector)}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              showInspector
                ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Inspecionar componentes do Tkinter correspondentes"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Widgets Tkinter</span>
          </button>

          {/* History drawer toggle */}
          <button
            onClick={() => setShowHistoryPanel(!showHistoryPanel)}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              showHistoryPanel
                ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Histórico ({history.length})</span>
          </button>

          {/* Theme switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setTheme('modern_dark')}
              className={`px-2 py-1 rounded-md transition-colors ${
                theme === 'modern_dark'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Moderno
            </button>
            <button
              onClick={() => setTheme('clean_light')}
              className={`px-2 py-1 rounded-md transition-colors ${
                theme === 'clean_light'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Clean Ttk
            </button>
            <button
              onClick={() => setTheme('classic')}
              className={`px-2 py-1 rounded-md transition-colors ${
                theme === 'classic'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Clássico 95
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Area (Tkinter Window + Optional Panels) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tkinter Window Container */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-100/70 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800/80 min-h-[500px]">
          
          {/* Simulated OS Desktop Window */}
          <div 
            ref={containerRef}
            className={`w-full max-w-[340px] select-none transition-all duration-200 ${currentTheme.windowBg} ${currentTheme.windowBorder}`}
            style={{ width: '100%', maxWidth: '340px' }}
          >
            {/* Tkinter Window Titlebar */}
            <div className={`flex items-center justify-between px-3 py-2 ${currentTheme.titleBarBg}`}>
              <div className="flex items-center gap-2 truncate">
                {/* Python Logo icon representation */}
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 110 110" className="w-3.5 h-3.5">
                    <path d="M54.5 7.5c-24.8 0-23.2 10.8-23.2 10.8l.1 11.2h23.7v3.4H21.4S6.2 31.2 6.2 56.4s13.3 24.3 13.3 24.3h7.9V69.5s-.4-13.3 13.1-13.3h22.7s12.7.2 12.7-12.2V19.7S78.2 7.5 54.5 7.5zm-13.3 7.3c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4-4.4-2-4.4-4.4 2-4.4 4.4-4.4z" fill="#366e9d"/>
                    <path d="M55.5 102.5c24.8 0 23.2-10.8 23.2-10.8l-.1-11.2H54.9v-3.4h33.7s15.2 1.7 15.2-23.5-13.3-24.3-13.3-24.3h-7.9v11.2s.4 13.3-13.1 13.3H46.8s-12.7-.2-12.7 12.2v24.3s-2.3 12.2 21.4 12.2zm13.3-7.3c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4z" fill="#ffd43b"/>
                  </svg>
                </div>
                <span className={`text-xs ${currentTheme.titleBarText} truncate`}>
                  {windowTitle}
                </span>
              </div>

              {/* OS Window Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  tabIndex={-1}
                  className="w-3.5 h-3.5 flex items-center justify-center rounded-xs bg-slate-300/30 hover:bg-slate-400/40 text-[10px] leading-none"
                  title="Minimizar (Simulado)"
                >
                  _
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  className="w-3.5 h-3.5 flex items-center justify-center rounded-xs bg-slate-300/30 hover:bg-slate-400/40 text-[9px] leading-none"
                  title="Maximizar (Travado no código: resizable(False, False))"
                >
                  □
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={handleClear}
                  className="w-3.5 h-3.5 flex items-center justify-center rounded-xs bg-red-500 hover:bg-red-600 text-white text-[9px] leading-none"
                  title="Fechar / Reiniciar"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Tkinter Inspector Annotation (if enabled) */}
            {showInspector && (
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-1 text-[11px] font-mono text-amber-700 dark:text-amber-300 flex items-center justify-between">
                <span>root = tk.Tk() [geometry: 320x420]</span>
                <span className="text-[10px] text-amber-600">resizable(False, False)</span>
              </div>
            )}

            {/* Simulated tk.Entry / Visor */}
            <div className="p-3 pb-1">
              {showInspector && (
                <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 mb-1 flex justify-between">
                  <span>visor = tk.Entry(textvariable=visor_var)</span>
                  <span>justify="right"</span>
                </div>
              )}
              
              <div className={`p-3 text-right flex flex-col justify-end min-h-[78px] ${currentTheme.displayBg}`}>
                <div className={`text-xs font-mono h-4 overflow-hidden text-ellipsis ${currentTheme.displaySub}`}>
                  {subDisplay || ' '}
                </div>
                <div 
                  className={`font-mono font-bold tracking-tight truncate ${
                    display.includes('Erro') 
                      ? 'text-red-500 text-base sm:text-lg' 
                      : display.length > 12 
                        ? 'text-xl' 
                        : 'text-2xl sm:text-3xl'
                  }`}
                >
                  {display}
                </div>
              </div>
            </div>

            {/* Simulated tk.Button Grid */}
            <div className={`grid grid-cols-4 ${currentTheme.gridPadding}`}>
              {showInspector && (
                <div className="col-span-4 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 pb-1">
                  # Grade de botões: tk.Button(...).grid(row, column, padx, pady)
                </div>
              )}

              {/* Row 1: C, CE, ⌫, ÷ */}
              <button
                type="button"
                onClick={handleClear}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnClear} ${activeKey === 'C' ? 'ring-2 ring-red-400 scale-95' : ''}`}
                title="Limpar tudo (tk.Button: C)"
              >
                C
              </button>
              <button
                type="button"
                onClick={handleClearEntry}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnClear} ${activeKey === 'CE' ? 'ring-2 ring-red-400 scale-95' : ''}`}
                title="Limpar entrada atual (CE)"
              >
                CE
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnClear} ${activeKey === '⌫' ? 'ring-2 ring-red-400 scale-95' : ''}`}
                title="Apagar último caractere (⌫)"
              >
                ⌫
              </button>
              <button
                type="button"
                onClick={() => handleOperator('÷')}
                className={`h-11 flex items-center justify-center text-base cursor-pointer ${currentTheme.btnOp} ${activeKey === '÷' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
                title="Operação de Divisão (÷)"
              >
                ÷
              </button>

              {/* Row 2: 7, 8, 9, × */}
              <button
                type="button"
                onClick={() => handleDigit('7')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '7' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                7
              </button>
              <button
                type="button"
                onClick={() => handleDigit('8')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '8' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                8
              </button>
              <button
                type="button"
                onClick={() => handleDigit('9')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '9' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                9
              </button>
              <button
                type="button"
                onClick={() => handleOperator('×')}
                className={`h-11 flex items-center justify-center text-base cursor-pointer ${currentTheme.btnOp} ${activeKey === '×' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
                title="Operação de Multiplicação (×)"
              >
                ×
              </button>

              {/* Row 3: 4, 5, 6, - */}
              <button
                type="button"
                onClick={() => handleDigit('4')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '4' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                4
              </button>
              <button
                type="button"
                onClick={() => handleDigit('5')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '5' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                5
              </button>
              <button
                type="button"
                onClick={() => handleDigit('6')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '6' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                6
              </button>
              <button
                type="button"
                onClick={() => handleOperator('-')}
                className={`h-11 flex items-center justify-center text-base cursor-pointer ${currentTheme.btnOp} ${activeKey === '-' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
                title="Operação de Subtração (-)"
              >
                -
              </button>

              {/* Row 4: 1, 2, 3, + */}
              <button
                type="button"
                onClick={() => handleDigit('1')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '1' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => handleDigit('2')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '2' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => handleDigit('3')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '3' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                3
              </button>
              <button
                type="button"
                onClick={() => handleOperator('+')}
                className={`h-11 flex items-center justify-center text-base cursor-pointer ${currentTheme.btnOp} ${activeKey === '+' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
                title="Operação de Adição (+)"
              >
                +
              </button>

              {/* Row 5: ±, 0, ., = */}
              <button
                type="button"
                onClick={handleToggleSign}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum}`}
                title="Inverter sinal (±)"
              >
                ±
              </button>
              <button
                type="button"
                onClick={() => handleDigit('0')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '0' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                0
              </button>
              <button
                type="button"
                onClick={() => handleDigit('.')}
                className={`h-11 flex items-center justify-center text-sm cursor-pointer ${currentTheme.btnNum} ${activeKey === '.' ? 'ring-2 ring-blue-400 scale-95' : ''}`}
              >
                .
              </button>
              <button
                type="button"
                onClick={handleCalculate}
                className={`h-11 flex items-center justify-center text-base cursor-pointer ${currentTheme.btnEq} ${activeKey === '=' ? 'ring-2 ring-emerald-400 scale-95' : ''}`}
                title="Calcular resultado (tk.Button: =)"
              >
                =
              </button>
            </div>

            {/* Simulated Tkinter Status bar */}
            <div className="px-3 py-1.5 border-t border-slate-300/30 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Python 3.x + Tkinter</span>
              <span>mainloop()</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Pressione as teclas do seu teclado físico para calcular
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Quick Tests & History Drawer */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Quick Operations Tester */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Testes Rápidos das 4 Operações
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">
              Clique nos exemplos abaixo para testar instantaneamente as operações no visor:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setDisplay('125+380');
                  setSubDisplay('');
                }}
                className="p-2 text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-lg text-xs transition-colors"
              >
                <div className="font-semibold text-blue-600 dark:text-blue-400">1. Adição (+)</div>
                <div className="font-mono text-slate-600 dark:text-slate-300 mt-0.5">125 + 380</div>
              </button>

              <button
                onClick={() => {
                  setDisplay('500-145');
                  setSubDisplay('');
                }}
                className="p-2 text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-lg text-xs transition-colors"
              >
                <div className="font-semibold text-blue-600 dark:text-blue-400">2. Subtração (-)</div>
                <div className="font-mono text-slate-600 dark:text-slate-300 mt-0.5">500 - 145</div>
              </button>

              <button
                onClick={() => {
                  setDisplay('18×14');
                  setSubDisplay('');
                }}
                className="p-2 text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-lg text-xs transition-colors"
              >
                <div className="font-semibold text-blue-600 dark:text-blue-400">3. Multiplicação (×)</div>
                <div className="font-mono text-slate-600 dark:text-slate-300 mt-0.5">18 × 14</div>
              </button>

              <button
                onClick={() => {
                  setDisplay('144÷12');
                  setSubDisplay('');
                }}
                className="p-2 text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-lg text-xs transition-colors"
              >
                <div className="font-semibold text-blue-600 dark:text-blue-400">4. Divisão (÷)</div>
                <div className="font-mono text-slate-600 dark:text-slate-300 mt-0.5">144 ÷ 12</div>
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Teste de Erro:</span>
              <button
                onClick={() => {
                  setDisplay('42÷0');
                  setSubDisplay('');
                }}
                className="px-2.5 py-1 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 rounded-md hover:bg-rose-100 transition-colors"
              >
                Testar Divisão por Zero (42 ÷ 0)
              </button>
            </div>
          </div>

          {/* History Panel */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Histórico de Cálculos
                </h3>
              </div>
              {history.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Limpar</span>
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
                Nenhum cálculo efetuado ainda. Realize operações no visor para registrar o histórico.
              </div>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectHistoryItem(item.result)}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700/60 rounded-lg cursor-pointer transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {item.expression} =
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white font-mono group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.result}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {item.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Features List */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-1.5">
            <div className="font-semibold text-slate-700 dark:text-slate-200">
              O que este código Python implementa:
            </div>
            <div className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span><strong>4 Operações Básicas:</strong> Adição (+), Subtração (-), Multiplicação (*), Divisão (/)</span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span><strong>Interface Gráfica:</strong> Construída com a biblioteca padrão <code>tkinter</code></span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span><strong>Layout em Grade:</strong> Posicionamento com <code>grid(row, column)</code></span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span><strong>Tratamento de Exceções:</strong> Prevenção de travamentos em <code>ZeroDivisionError</code></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
