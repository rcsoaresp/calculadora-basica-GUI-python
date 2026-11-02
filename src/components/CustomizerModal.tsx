import React from 'react';
import { X, SlidersHorizontal, Check } from 'lucide-react';
import { PythonConfig } from '../types/calculator';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PythonConfig;
  onChangeConfig: (newConfig: PythonConfig) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Personalizar Código Python da Calculadora
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs">
          {/* Window Title */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 dark:text-slate-200">
              Título da Janela (<code>janela.title(...)</code>):
            </label>
            <input
              type="text"
              value={config.windowTitle}
              onChange={(e) => onChangeConfig({ ...config, windowTitle: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Calculadora Simples"
            />
          </div>

          {/* Window Dimensions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 dark:text-slate-200">
                Largura da Janela (pixels):
              </label>
              <input
                type="number"
                min="280"
                max="500"
                step="10"
                value={config.width}
                onChange={(e) => onChangeConfig({ ...config, width: parseInt(e.target.value) || 320 })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 dark:text-slate-200">
                Altura da Janela (pixels):
              </label>
              <input
                type="number"
                min="380"
                max="600"
                step="10"
                value={config.height}
                onChange={(e) => onChangeConfig({ ...config, height: parseInt(e.target.value) || 420 })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="font-semibold text-slate-800 dark:text-slate-200">
                Tamanho da Fonte do Visor:
              </label>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{config.fontSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="32"
              value={config.fontSize}
              onChange={(e) => onChangeConfig({ ...config, fontSize: parseInt(e.target.value) || 22 })}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Color Palette Theme */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 dark:text-slate-200">
              Estilo de Cores do Código Gerado:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onChangeConfig({ ...config, themeStyle: 'classic' })}
                className={`p-2.5 text-center rounded-lg border cursor-pointer transition-all ${
                  config.themeStyle === 'classic'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 font-bold text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Clássico Tkinter
              </button>

              <button
                type="button"
                onClick={() => onChangeConfig({ ...config, themeStyle: 'modern' })}
                className={`p-2.5 text-center rounded-lg border cursor-pointer transition-all ${
                  config.themeStyle === 'modern'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 font-bold text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Dark Theme
              </button>

              <button
                type="button"
                onClick={() => onChangeConfig({ ...config, themeStyle: 'ttk' })}
                className={`p-2.5 text-center rounded-lg border cursor-pointer transition-all ${
                  config.themeStyle === 'ttk'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 font-bold text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Clean Ttk
              </button>
            </div>
          </div>

          {/* Keyboard Shortcuts Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
                Incluir Atalhos do Teclado no Código
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Gera os bindings <code>janela.bind('&lt;Return&gt;', ...)</code> para Enter, Backspace e Esc.
              </div>
            </div>
            <input
              type="checkbox"
              checked={config.enableKeyboardShortcuts}
              onChange={(e) => onChangeConfig({ ...config, enableKeyboardShortcuts: e.target.checked })}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Aplicar e Atualizar Código</span>
          </button>
        </div>
      </div>
    </div>
  );
};
