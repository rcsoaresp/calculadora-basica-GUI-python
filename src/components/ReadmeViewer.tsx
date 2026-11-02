import React, { useState } from 'react';
import { FileText, Copy, Check, Download, ExternalLink, BookOpen, Terminal, Monitor, Cpu, Apple, HelpCircle } from 'lucide-react';

interface ReadmeViewerProps {
  onDownloadReadme: () => void;
}

export const ReadmeViewer: React.FC<ReadmeViewerProps> = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered');

  const fullMarkdown = `# 🧮 Calculadora com Interface Gráfica em Python (Tkinter)

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Tkinter](https://img.shields.io/badge/GUI-Tkinter-1f2937?style=for-the-badge)](https://docs.python.org/3/library/tkinter.html)
[![Cloud Run](https://img.shields.io/badge/Deploy-Google_Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/run)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> Aplicação completa de uma calculadora matemática desenvolvida em **Python** utilizando a biblioteca nativa **Tkinter**, com suporte às quatro operações aritméticas básicas, tratamento de exceções, atalhos de teclado e simulador interativo em nuvem.

---

## 🚀 Acesso à Aplicação em Execução (Google Cloud Run)

Você pode testar a calculadora em funcionamento direto pelo seu navegador sem precisar instalar nada através da URL de produção hospedada no **Google Cloud Run (Região \`europe-west2\` - Londres)**:

### 🔗 **[Clique aqui para abrir a Calculadora no Google Cloud Run](https://ais-pre-3i3dlttexqpgxnnqqfl4ha-983450994454.europe-west2.run.app)**

\`\`\`text
URL Direta de Execução:
https://ais-pre-3i3dlttexqpgxnnqqfl4ha-983450994454.europe-west2.run.app
\`\`\`

---

## 📌 Funcionalidades Principais

* **As 4 Operações Básicas**:
  * ➕ **Adição (\`+\`)**: Soma de inteiros e decimais com encadeamento de operações.
  * ➖ **Subtração (\`-\`)**: Subtrações sucessivas e suporte a números negativos (\`±\`).
  * ✖️ **Multiplicação (\`×\` / \`*\`)**: Multiplicação com precisão aritmética.
  * ➗ **Divisão (\`÷\` / \`/\`)**: Divisão com tratamento defensivo contra divisão por zero (\`ZeroDivisionError\`).
* **Tratamento Robusto de Exceções**: Prevenção ativa contra erros de sintaxe ou divisão por zero com aviso amigável no visor (\`Erro: Divisão por 0\`), sem quebrar o programa.
* **Interface Gráfica com Tkinter**:
  * Visor \`tk.Entry\` alinhado à direita (\`justify="right"\`).
  * Grade de botões organizada em matriz 4x5 usando o gerenciador de geometria \`grid()\`.
  * Atualização dinâmica via \`tk.StringVar()\`.
* **Suporte Completo a Teclado Físico**:
  * Dígitos \`0-9\` e ponto decimal \`.\`.
  * Operadores \`+\`, \`-\`, \`*\`, \`/\`.
  * Teclas de ação: \`Enter\` ou \`=\` (calcular), \`Backspace\` (apagar último dígito), \`Escape\` (limpar tudo).
* **Simulador Web & Download**: A versão em nuvem permite testar diferentes temas do Tkinter (*Classic 95*, *CustomTkinter Dark* e *Modern Ttk*) e baixar o script \`.py\` personalizado com um clique.

---

## 💻 Guia Completo: Como Executar no seu Computador

O Tkinter já vem instalado por padrão no Python oficial para **Windows** e **macOS**. No **Linux**, basta instalar o pacote de suporte se necessário.

### 📋 Passo a Passo de Execução

#### 1. Salvar o Código
Crie um arquivo chamado \`calculadora.py\` em uma pasta de sua preferência e cole o código-fonte disponibilizado abaixo, ou faça o download direto pela aplicação web.

#### 2. Testar se o Tkinter está ativo
Abra seu terminal ou Prompt de Comando e execute o comando de diagnóstico do Python:
\`\`\`bash
python -m tkinter
\`\`\`
*(Uma pequena janela de teste do Tkinter deve se abrir na sua tela).*

#### 3. Rodar a Calculadora
Navegue até a pasta onde salvou o arquivo e execute o comando correspondente ao seu sistema operacional:
\`\`\`bash
python calculadora.py
\`\`\`

---

### 🖥️ Instruções por Sistema Operacional

#### No Windows
1. Abra o **Prompt de Comando (CMD)** ou **PowerShell** na pasta do arquivo e execute:
   \`\`\`cmd
   python calculadora.py
   \`\`\`
2. **Execução Direta:** Você também pode simplesmente dar um **duplo clique** no arquivo \`calculadora.py\`.
3. **Dica sem tela preta:** Renomeie o arquivo para \`calculadora.pyw\` para abrir diretamente a janela gráfica sem a janela preta do terminal em segundo plano.

#### No Linux (Ubuntu / Debian / Linux Mint / Fedora)
Algumas distribuições Linux separam o Tkinter da instalação padrão do interpretador. Caso ocorra o erro \`ModuleNotFoundError: No module named 'tkinter'\`, instale com:

* **Ubuntu / Debian / Mint:**
  \`\`\`bash
  sudo apt update
  sudo apt install python3-tk
  python3 calculadora.py
  \`\`\`
* **Fedora / RHEL:**
  \`\`\`bash
  sudo dnf install python3-tkinter
  python3 calculadora.py
  \`\`\`
* **Arch Linux:**
  \`\`\`bash
  sudo pacman -S tk
  python3 calculadora.py
  \`\`\`

#### No macOS
O Tkinter já vem incluído no instalador oficial baixado do [python.org](https://www.python.org/downloads/). Abra o Terminal (\`Cmd + Espaço\` → digite \`Terminal\`) e rode:
\`\`\`bash
python3 calculadora.py
\`\`\`

---

### ❓ Perguntas Frequentes & Resolução de Dúvidas

* **O que acontece ao tentar dividir por zero?**
  No Python puro, operações como \`5 / 0\` disparam a exceção \`ZeroDivisionError\`. Nosso código intercepta essa situação com um bloco \`try ... except ZeroDivisionError\` e exibe amigavelmente \`Erro: Divisão por 0\` no visor, impedindo o encerramento inesperado da aplicação.

* **O que faz o método \`mainloop()\`?**
  O método \`janela.mainloop()\` inicia o ciclo infinito de escuta de eventos do Tkinter (cliques de mouse, digitação no teclado e redesenho dos widgets na tela). Sem ele, o script finalizaria imediatamente após desenhar os botões.

* **Como adicionar novas operações (ex: porcentagem ou raiz quadrada)?**
  Basta importar a biblioteca \`math\` (\`import math\`) e adicionar funções de cálculo correspondentes, inserindo novos botões na grade com \`tk.Button(..., command=...)\`.

---

## 📐 Anatomia dos Componentes Tkinter

| Componente | Classe Tkinter | Finalidade na Calculadora |
| :--- | :--- | :--- |
| **Janela Raiz** | \`tk.Tk()\` | Cria a janela do SO, título, ícone e dimensões (\`320x420\`). |
| **Visor** | \`tk.Entry()\` | Exibe a expressão matemática e o resultado alinhado à direita. |
| **Estado Reativo** | \`tk.StringVar()\` | Sincroniza dinamicamente o valor do visor em tempo real via \`.set()\` e \`.get()\`. |
| **Botões** | \`tk.Button()\` | Disparam as ações usando funções anônimas \`lambda\`. |
| **Layout** | \`widget.grid()\` | Posiciona cada elemento em linhas e colunas com \`columnspan\` e \`weight\`. |
| **Event Loop** | \`janela.mainloop()\` | Mantém o programa ativo escutando eventos de cliques e teclas. |

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem Principal**: Python 3.x
* **Biblioteca Gráfica**: Tkinter (Standard GUI Library)
* **Simulador & Demonstração Web**: React 19, TypeScript, Tailwind CSS
* **Hospedagem em Nuvem**: Google Cloud Run (Serverless Container em \`europe-west2\`)

---

## 📄 Licença

Distribuído sob a licença **MIT**.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8;' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4">
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Documentação Completa (README.md)
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Inclui Guia de Execução Completo, Código Python, Anatomia do Tkinter e URL do Cloud Run
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle view mode */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('rendered')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'rendered'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Visualização Formatada
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'raw'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Código Markdown (.md)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Copiar texto do README"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar README.md</span>
          </button>
        </div>
      </div>

      {/* Content box */}
      {viewMode === 'rendered' ? (
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs space-y-8">
          {/* GitHub Header Simulation */}
          <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🧮</span>
              <span>Calculadora com Interface Gráfica em Python (Tkinter)</span>
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#3776AB] text-white">
                Python 3.8+
              </span>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-slate-800 text-white">
                GUI Tkinter
              </span>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#4285F4] text-white">
                Deploy Google Cloud Run
              </span>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-600 text-white">
                License MIT
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 italic pl-3 border-l-2 border-blue-500">
              Aplicação completa de uma calculadora matemática desenvolvida em <strong>Python</strong> utilizando a biblioteca nativa <strong>Tkinter</strong>, com suporte às quatro operações aritméticas básicas, tratamento de exceções, atalhos de teclado e simulador interativo em nuvem.
            </p>
          </div>

          {/* Cloud Run Section */}
          <div className="p-4 sm:p-5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🚀</span>
              <span>Acesso à Aplicação em Execução (Google Cloud Run)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Você pode testar a calculadora em funcionamento direto pelo seu navegador sem precisar instalar nada através da URL de produção hospedada no <strong>Google Cloud Run (Região <code>europe-west2</code> - Londres)</strong>:
            </p>
            <div className="p-3 bg-slate-950 text-blue-300 font-mono text-xs rounded-lg flex items-center justify-between overflow-x-auto">
              <a 
                href="https://ais-pre-3i3dlttexqpgxnnqqfl4ha-983450994454.europe-west2.run.app" 
                target="_blank" 
                rel="noreferrer"
                className="hover:underline flex items-center gap-1.5"
              >
                <span>https://ais-pre-3i3dlttexqpgxnnqqfl4ha-983450994454.europe-west2.run.app</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📌</span>
              <span>Funcionalidades Principais</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li><strong>As 4 Operações Básicas:</strong> Adição (+), Subtração (-), Multiplicação (× / *) e Divisão (÷ / /).</li>
              <li><strong>Tratamento Robusto de Exceções:</strong> Prevenção contra <code>ZeroDivisionError</code> exibindo amigavelmente <em>"Erro: Divisão por 0"</em>.</li>
              <li><strong>Interface Gráfica com Tkinter:</strong> Visor <code>tk.Entry</code>, grade de botões em matriz com <code>grid()</code> e variáveis reativas <code>tk.StringVar()</code>.</li>
              <li><strong>Suporte a Teclado Físico:</strong> Operação direta via teclado com detecção de Enter, Backspace e Escape.</li>
              <li><strong>Simulador Web & Download:</strong> Demonstração interativa e download do script <code>calculadora.py</code> pronto para rodar.</li>
            </ul>
          </div>

          {/* Guia Como Executar */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>💻</span>
              <span>Guia Completo: Como Executar no seu Computador</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="font-semibold text-xs text-blue-600 dark:text-blue-400">1. Salvar o Arquivo</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Salve o código com o nome <code>calculadora.py</code> em uma pasta de sua escolha.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="font-semibold text-xs text-blue-600 dark:text-blue-400">2. Testar o Tkinter</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                  python -m tkinter
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="font-semibold text-xs text-emerald-600 dark:text-emerald-400">3. Executar o Script</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                  python calculadora.py
                </p>
              </div>
            </div>

            {/* OS Specific Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs space-y-1.5">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-sky-600" />
                  No Windows
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Execute no terminal com <code>python calculadora.py</code> ou dê duplo clique no arquivo. Use a extensão <code>.pyw</code> para abrir sem o prompt preto.
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs space-y-1.5">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-amber-600" />
                  No Linux
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  No Ubuntu/Debian execute <code>sudo apt install python3-tk</code> e depois <code>python3 calculadora.py</code>.
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs space-y-1.5">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Apple className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  No macOS
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Já incluído no Python oficial do python.org. Execute via terminal com <code>python3 calculadora.py</code>.
                </p>
              </div>
            </div>

            {/* FAQ Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                Resolução de Dúvidas Comuns
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                <strong>Divisão por zero:</strong> O programa trata o erro via <code>try/except ZeroDivisionError</code> sem travar.<br/>
                <strong>Janela fecha rápido?</strong> Certifique-se de que a última linha seja <code>janela.mainloop()</code>.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs rounded-xl border border-slate-800 overflow-x-auto max-h-[550px]">
          <pre className="whitespace-pre">{fullMarkdown}</pre>
        </div>
      )}
    </div>
  );
};
