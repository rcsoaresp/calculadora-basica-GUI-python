import React, { useState } from 'react';
import { 
  Terminal, 
  HelpCircle, 
  Check, 
  Copy, 
  AlertTriangle,
  Play,
  Monitor,
  Apple,
  Cpu
} from 'lucide-react';

export const HowToRunGuide: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:from-slate-900 dark:to-slate-900 border border-blue-200/60 dark:border-slate-800 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5">
            <Play className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Como Executar a Calculadora Python no seu Computador
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              O Tkinter já vem instalado por padrão no Python oficial para <strong>Windows</strong> e <strong>macOS</strong>. No <strong>Linux</strong>, basta instalar o pacote de suporte se necessário. Siga os passos rápidos abaixo.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Execution Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Salvar o Código
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Clique na aba <strong>Código Python</strong> acima e depois em <strong>Baixar calculadora_simples.py</strong>, ou crie um arquivo com esse nome no seu editor favorito (VS Code, Bloco de Notas, PyCharm).
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Testar o Tkinter
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Abra seu terminal ou Prompt de Comando e execute o comando de diagnóstico do Python para confirmar que o Tkinter está ativo:
          </p>
          <div className="flex items-center justify-between p-2 bg-slate-950 text-slate-200 font-mono text-xs rounded-md">
            <span>python -m tkinter</span>
            <button
              onClick={() => copyToClipboard('python -m tkinter', 1)}
              className="p-1 hover:text-white text-slate-400 transition-colors cursor-pointer"
              title="Copiar comando"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Rodar a Calculadora
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Navegue até a pasta onde salvou o arquivo e rode o script:
          </p>
          <div className="flex items-center justify-between p-2 bg-slate-950 text-slate-200 font-mono text-xs rounded-md">
            <span>python calculadora_simples.py</span>
            <button
              onClick={() => copyToClipboard('python calculadora_simples.py', 2)}
              className="p-1 hover:text-white text-slate-400 transition-colors cursor-pointer"
              title="Copiar comando"
            >
              {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* OS Specific Guides */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-600" />
          Comandos por Sistema Operacional
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Windows */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-sky-600" />
              Windows
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              No Windows, você pode dar <strong>duplo clique</strong> no arquivo <code>.py</code> ou abrir o PowerShell:
            </p>
            <div className="p-2 bg-slate-950 text-slate-200 font-mono text-[11px] rounded-md flex justify-between items-center">
              <span>python calculadora.py</span>
              <button
                onClick={() => copyToClipboard('python calculadora.py', 3)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Dica: Salve como <code>.pyw</code> se quiser executar sem abrir a janela preta do terminal!
            </p>
          </div>

          {/* Linux */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-600" />
              Linux (Ubuntu / Debian / Mint)
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Algumas distribuições Linux não incluem o Tkinter por padrão. Se der erro de <code>ModuleNotFoundError: No module named 'tkinter'</code>, instale com:
            </p>
            <div className="p-2 bg-slate-950 text-slate-200 font-mono text-[11px] rounded-md flex justify-between items-center">
              <span>sudo apt install python3-tk</span>
              <button
                onClick={() => copyToClipboard('sudo apt install python3-tk', 4)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                {copiedIndex === 4 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              No Fedora use <code>sudo dnf install python3-tkinter</code>.
            </p>
          </div>

          {/* macOS */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Apple className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              macOS
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Abra o Terminal (Cmd + Espaço &rarr; Terminal) e rode:
            </p>
            <div className="p-2 bg-slate-950 text-slate-200 font-mono text-[11px] rounded-md flex justify-between items-center">
              <span>python3 calculadora.py</span>
              <button
                onClick={() => copyToClipboard('python3 calculadora.py', 5)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                {copiedIndex === 5 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Recomendado usar o instalador oficial do python.org para melhor integração visual com o Aqua/Cocoa.
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting FAQ */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          Perguntas Frequentes & Resolução de Dúvidas
        </h4>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
            <div className="font-semibold text-slate-900 dark:text-white mb-1">
              • O que acontece se o usuário tentar dividir por zero?
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              No Python, operações como <code>5 / 0</code> disparam uma exceção <code>ZeroDivisionError</code>. Nosso código intercepta essa exceção com um bloco <code>try ... except ZeroDivisionError</code> e exibe amigavelmente <code>"Erro: Divisão por 0"</code> no visor, evitando que o programa feche abruptamente.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
            <div className="font-semibold text-slate-900 dark:text-white mb-1">
              • O que significa a função mainloop()?
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              O método <code>janela.mainloop()</code> é o coração do Tkinter. Ele coloca a aplicação em um loop infinito de escuta de eventos (cliques de mouse, digitação no teclado, redesenho da tela). Sem ele, a janela abriria e fecharia em uma fração de segundo.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
            <div className="font-semibold text-slate-900 dark:text-white mb-1">
              • Como adicionar novas operações como porcentagem (%) ou raiz quadrada?
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Você pode importar o módulo <code>math</code> com <code>import math</code> e adicionar uma nova função como <code>def raiz(): visor_var.set(str(math.sqrt(float(visor_var.get()))))</code>, adicionando o botão correspondente na lista de botões com <code>('√', linha, coluna)</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
