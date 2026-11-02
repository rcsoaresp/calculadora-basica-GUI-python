import React, { useState } from 'react';
import { Layers, Box, Terminal, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TkinterAnatomy: React.FC = () => {
  const [selectedWidget, setSelectedWidget] = useState<string>('grid');

  const widgets = [
    {
      id: 'root',
      name: 'janela = tk.Tk()',
      title: '1. Janela Principal (Root Window)',
      description: 'Cria a janela principal do sistema operacional com barra de título, botões fechar/minimizar e dimensões controladas.',
      pythonCode: `import tkinter as tk\n\njanela = tk.Tk()\njanela.title("Calculadora")\njanela.geometry("320x420")\njanela.resizable(False, False)`,
      tips: 'A propriedade resizable(False, False) impede que o usuário quebre o alinhamento da calculadora puxando as bordas da janela.',
    },
    {
      id: 'stringvar',
      name: 'visor_var = tk.StringVar()',
      title: '2. Variável Reativa (StringVar)',
      description: 'Uma variável especial do Tkinter que vincula o código Python aos widgets visuais. Toda vez que você chama set(), o visor atualiza automaticamente.',
      pythonCode: `visor_var = tk.StringVar(value="0")\n\n# Para atualizar o visor:\nvisor_var.set("42")\n\n# Para ler o que está no visor:\nconteudo = visor_var.get()`,
      tips: 'Evita a necessidade de apagar manualmente o texto do Entry com delete(0, END) e insert(0, text).',
    },
    {
      id: 'entry',
      name: 'visor = tk.Entry(...)',
      title: '3. Visor de Entrada (Entry Widget)',
      description: 'O campo onde a expressão matemática e os resultados são mostrados para o usuário, alinhado à direita como em calculadoras físicas.',
      pythonCode: `visor = tk.Entry(\n    janela,\n    textvariable=visor_var,\n    font=("Arial", 22, "bold"),\n    justify="right",  # Alinha números à direita\n    bd=0,\n    highlightthickness=2\n)`,
      tips: 'justify="right" é crucial para calculadoras para que os números apareçam do mesmo modo que calculadoras comerciais.',
    },
    {
      id: 'button',
      name: 'botao = tk.Button(...)',
      title: '4. Botões e Ações (Button Widget & lambda)',
      description: 'Cada número e operador é um botão interativo com uma função de comando (command) associada.',
      pythonCode: `botao = tk.Button(\n    janela,\n    text="7",\n    font=("Arial", 14, "bold"),\n    command=lambda: inserir_caractere("7")\n)`,
      tips: 'O uso de lambda é obrigatório para passar parâmetros em botões Tkinter; sem lambda, a função seria executada assim que a janela fosse criada!',
    },
    {
      id: 'grid',
      name: 'widget.grid(row, column)',
      title: '5. Gerenciador de Grade (Grid Layout)',
      description: 'O sistema de coordenadas em linhas e colunas mais eficiente para calculadoras. Permite alinhar botões em matriz e expandir colunas com peso.',
      pythonCode: `# Visor ocupa as 4 colunas no topo\nvisor.grid(row=0, column=0, columnspan=4, padx=12, pady=16, sticky="nsew")\n\n# Botões distribuídos nas linhas 1 a 5\nbotao_7.grid(row=2, column=0, padx=4, pady=4, sticky="nsew")\n\n# Faz as colunas expandirem uniformemente\nfor i in range(4):\n    janela.grid_columnconfigure(i, weight=1)`,
      tips: 'sticky="nsew" faz o botão esticar para preencher todo o espaço da sua célula na grade.',
    },
    {
      id: 'mainloop',
      name: 'janela.mainloop()',
      title: '6. Ciclo de Eventos (Event Loop)',
      description: 'Mantém a janela ativa escutando cliques, digitação e repintando os elementos na tela a cada milissegundo.',
      pythonCode: `if __name__ == "__main__":\n    janela.mainloop()`,
      tips: 'Qualquer linha de código colocada após mainloop() só será executada quando a janela for fechada pelo usuário.',
    },
  ];

  const activeWidget = widgets.find((w) => w.id === selectedWidget) || widgets[0];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
          <Layers className="w-4 h-4 text-blue-600" />
          Anatomia Técnica do Tkinter na Calculadora
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Entenda como cada classe e método da biblioteca Tkinter interage para criar a interface:
        </p>

        {/* Widgets Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {widgets.map((widget) => {
            const isSelected = selectedWidget === widget.id;
            return (
              <button
                key={widget.id}
                onClick={() => setSelectedWidget(widget.id)}
                className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-400 dark:border-blue-700 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${
                  isSelected ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-400'
                }`}>
                  Passo {widget.title.split('.')[0]}
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate font-mono">
                  {widget.name.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Widget Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-block px-2.5 py-1 text-xs font-mono font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 rounded-md">
              {activeWidget.name}
            </div>
            
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {activeWidget.title}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeWidget.description}
            </p>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs space-y-1">
              <div className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Dica de Ouro no Tkinter:
              </div>
              <p className="text-amber-700 dark:text-amber-400/90 leading-relaxed">
                {activeWidget.tips}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-2">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              Trecho no Código Python:
            </div>
            <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
              <pre className="whitespace-pre">{activeWidget.pythonCode}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
