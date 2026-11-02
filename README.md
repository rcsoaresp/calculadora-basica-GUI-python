# 🧮 Calculadora com Interface Gráfica em Python (Tkinter)

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Tkinter](https://img.shields.io/badge/GUI-Tkinter-1f2937?style=for-the-badge)](https://docs.python.org/3/library/tkinter.html)
[![Cloud Run](https://img.shields.io/badge/Deploy-Google_Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/run)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> Aplicação completa de uma calculadora matemática desenvolvida em **Python** utilizando a biblioteca nativa **Tkinter**, com suporte às quatro operações aritméticas básicas, tratamento de exceções, atalhos de teclado e simulador interativo em nuvem.

---

## 🚀 Acesso à Aplicação em Execução (Google Cloud Run)

Você pode testar a calculadora em funcionamento direto pelo seu navegador sem precisar instalar nada através da URL de produção hospedada no **Google Cloud Run (Região `europe-west2` - Londres)**:

### 🔗 **[Clique aqui para abrir a Calculadora no Google Cloud Run](https://ais-pre-3i3dlttexqpgxnnqqfl4ha-983450994454.europe-west2.run.app)**

```text
URL Direta de Execução:
https://ais-pre-3i3dlttexqpgxnnqqfl4ha-983450994454.europe-west2.run.app
```

---

## 📌 Funcionalidades Principais

* **As 4 Operações Básicas**:
  * ➕ **Adição (`+`)**: Soma de inteiros e decimais com encadeamento de operações.
  * ➖ **Subtração (`-`)**: Subtrações sucessivas e suporte a números negativos (`±`).
  * ✖️ **Multiplicação (`×` / `*`)**: Multiplicação com precisão aritmética.
  * ➗ **Divisão (`÷` / `/`)**: Divisão com tratamento defensivo contra divisão por zero (`ZeroDivisionError`).
* **Tratamento Robusto de Exceções**: Prevenção ativa contra erros de sintaxe ou divisão por zero com aviso amigável no visor (`Erro: Divisão por 0`), sem quebrar o programa.
* **Interface Gráfica com Tkinter**:
  * Visor `tk.Entry` alinhado à direita (`justify="right"`).
  * Grade de botões organizada em matriz 4x5 usando o gerenciador de geometria `grid()`.
  * Atualização dinâmica via `tk.StringVar()`.
* **Suporte Completo a Teclado Físico**:
  * Dígitos `0-9` e ponto decimal `.`.
  * Operadores `+`, `-`, `*`, `/`.
  * Teclas de ação: `Enter` ou `=` (calcular), `Backspace` (apagar último dígito), `Escape` (limpar tudo).
* **Simulador Web & Download**: A versão em nuvem permite testar diferentes temas do Tkinter (*Classic 95*, *CustomTkinter Dark* e *Modern Ttk*) e baixar o script `.py` personalizado com um clique.

---

## 💻 Guia Completo: Como Executar no seu Computador

O Tkinter já vem instalado por padrão no Python oficial para **Windows** e **macOS**. No **Linux**, basta instalar o pacote de suporte se necessário.

### 📋 Passo a Passo de Execução

#### 1. Salvar o Código
Crie um arquivo chamado `calculadora.py` em uma pasta de sua preferência e cole o código-fonte disponibilizado abaixo, ou faça o download direto pela aplicação web.

#### 2. Testar se o Tkinter está ativo
Abra seu terminal ou Prompt de Comando e execute o comando de diagnóstico do Python:
```bash
python -m tkinter
```
*(Uma pequena janela de teste do Tkinter deve se abrir na sua tela).*

#### 3. Rodar a Calculadora
Navegue até a pasta onde salvou o arquivo e execute o comando correspondente ao seu sistema operacional:
```bash
python calculadora.py
```

---

### 🖥️ Instruções por Sistema Operacional

#### No Windows
1. Abra o **Prompt de Comando (CMD)** ou **PowerShell** na pasta do arquivo e execute:
   ```cmd
   python calculadora.py
   ```
2. **Execução Direta:** Você também pode simplesmente dar um **duplo clique** no arquivo `calculadora.py`.
3. **Dica sem tela preta:** Renomeie o arquivo para `calculadora.pyw` para abrir diretamente a janela gráfica sem a janela preta do terminal em segundo plano.

#### No Linux (Ubuntu / Debian / Linux Mint / Fedora)
Algumas distribuições Linux separam o Tkinter da instalação padrão do interpretador. Caso ocorra o erro `ModuleNotFoundError: No module named 'tkinter'`, instale com:

* **Ubuntu / Debian / Mint:**
  ```bash
  sudo apt update
  sudo apt install python3-tk
  python3 calculadora.py
  ```
* **Fedora / RHEL:**
  ```bash
  sudo dnf install python3-tkinter
  python3 calculadora.py
  ```
* **Arch Linux:**
  ```bash
  sudo pacman -S tk
  python3 calculadora.py
  ```

#### No macOS
O Tkinter já vem incluído no instalador oficial baixado do [python.org](https://www.python.org/downloads/). Abra o Terminal (`Cmd + Espaço` → digite `Terminal`) e rode:
```bash
python3 calculadora.py
```

---

### ❓ Perguntas Frequentes & Resolução de Dúvidas

* **O que acontece ao tentar dividir por zero?**
  No Python puro, operações como `5 / 0` disparam a exceção `ZeroDivisionError`. Nosso código intercepta essa situação com um bloco `try ... except ZeroDivisionError` e exibe amigavelmente `Erro: Divisão por 0` no visor, impedindo o encerramento inesperado da aplicação.

* **O que faz o método `mainloop()`?**
  O método `janela.mainloop()` inicia o ciclo infinito de escuta de eventos do Tkinter (cliques de mouse, digitação no teclado e redesenho dos widgets na tela). Sem ele, o script finalizaria imediatamente após desenhar os botões.

* **Como adicionar novas operações (ex: porcentagem ou raiz quadrada)?**
  Basta importar a biblioteca `math` (`import math`) e adicionar funções de cálculo correspondentes, inserindo novos botões na grade com `tk.Button(..., command=...)`.

---

## 📂 Código-Fonte Python (`calculadora.py`)

Abaixo está o código-fonte limpo, comentado e 100% funcional:

```python
"""
Calculadora Simples com Interface Gráfica (Tkinter)
Suporta as 4 operações matemáticas básicas: Adição, Subtração, Multiplicação e Divisão.
"""

import tkinter as tk

# -------------------------------------------------------------
# 1. FUNÇÕES DE CONTROLE DA CALCULADORA
# -------------------------------------------------------------

def inserir_caractere(caractere):
    """Insere dígitos ou operadores no visor."""
    texto_atual = visor_var.get()
    if texto_atual == "0" or "Erro" in texto_atual:
        visor_var.set(caractere)
    else:
        visor_var.set(texto_atual + caractere)

def limpar_visor():
    """Limpa todo o conteúdo do visor (botão C)."""
    visor_var.set("0")

def apagar_ultimo():
    """Apaga o último dígito inserido (botão Backspace / ⌫)."""
    texto_atual = visor_var.get()
    if len(texto_atual) > 1 and "Erro" not in texto_atual:
        visor_var.set(texto_atual[:-1])
    else:
        visor_var.set("0")

def calcular_resultado():
    """Avalia a expressão matemática e exibe o resultado com tratamento de erros."""
    expressao = visor_var.get().replace('×', '*').replace('÷', '/')
    try:
        resultado = eval(expressao)
        if isinstance(resultado, float) and resultado.is_integer():
            resultado = int(resultado)
        visor_var.set(str(resultado))
    except ZeroDivisionError:
        visor_var.set("Erro: Divisão por 0")
    except Exception:
        visor_var.set("Erro de Sintaxe")

# -------------------------------------------------------------
# 2. CONFIGURAÇÃO DA JANELA PRINCIPAL
# -------------------------------------------------------------
janela = tk.Tk()
janela.title("Calculadora Python Tkinter")
janela.geometry("320x420")
janela.resizable(False, False)
janela.config(bg="#f3f4f6")

visor_var = tk.StringVar(value="0")

# -------------------------------------------------------------
# 3. VISOR / DISPLAY (tk.Entry)
# -------------------------------------------------------------
visor = tk.Entry(
    janela,
    textvariable=visor_var,
    font=("Arial", 22, "bold"),
    bg="#ffffff",
    fg="#1f2937",
    justify="right",
    bd=0,
    highlightthickness=2,
    highlightbackground="#d1d5db",
    highlightcolor="#2563eb"
)
visor.grid(row=0, column=0, columnspan=4, padx=12, pady=16, ipady=12, sticky="nsew")

# -------------------------------------------------------------
# 4. GRADE DE BOTÕES (Matriz 4x5)
# -------------------------------------------------------------
botoes = [
    ('C', 1, 0), ('CE', 1, 1), ('⌫', 1, 2), ('÷', 1, 3),
    ('7', 2, 0), ('8', 2, 1),  ('9', 2, 2), ('×', 2, 3),
    ('4', 3, 0), ('5', 3, 1),  ('6', 3, 2), ('-', 3, 3),
    ('1', 4, 0), ('2', 4, 1),  ('3', 4, 2), ('+', 4, 3),
    ('0', 5, 0), ('.', 5, 1),  ('±', 5, 2), ('=', 5, 3)
]

def inverter_sinal():
    try:
        valor = float(visor_var.get())
        visor_var.set(str(int(-valor) if valor.is_integer() else -valor))
    except Exception:
        pass

for texto, linha, coluna in botoes:
    if texto in ['+', '-', '×', '÷']:
        bg_cor, fg_cor = "#2563eb", "#ffffff"
        cmd = lambda t=texto: inserir_caractere(t)
    elif texto == '=':
        bg_cor, fg_cor = "#16a34a", "#ffffff"
        cmd = calcular_resultado
    elif texto in ['C', 'CE']:
        bg_cor, fg_cor = "#dc2626", "#ffffff"
        cmd = limpar_visor
    elif texto == '⌫':
        bg_cor, fg_cor = "#ea580c", "#ffffff"
        cmd = apagar_ultimo
    elif texto == '±':
        bg_cor, fg_cor = "#e5e7eb", "#1f2937"
        cmd = inverter_sinal
    else:
        bg_cor, fg_cor = "#ffffff", "#1f2937"
        cmd = lambda t=texto: inserir_caractere(t)

    btn = tk.Button(
        janela,
        text=texto,
        font=("Arial", 14, "bold"),
        bg=bg_cor,
        fg=fg_cor,
        activebackground="#93c5fd",
        bd=0,
        relief="flat",
        cursor="hand2",
        command=cmd
    )
    btn.grid(row=linha, column=coluna, padx=4, pady=4, sticky="nsew")

for i in range(4):
    janela.grid_columnconfigure(i, weight=1)
for i in range(1, 6):
    janela.grid_rowconfigure(i, weight=1)

# -------------------------------------------------------------
# 5. LOOP DE EVENTOS DA INTERFACE
# -------------------------------------------------------------
if __name__ == "__main__":
    janela.mainloop()
```

---

## 📐 Anatomia dos Componentes Tkinter

| Componente | Classe Tkinter | Finalidade na Calculadora |
| :--- | :--- | :--- |
| **Janela Raiz** | `tk.Tk()` | Cria a janela do SO, título, ícone e dimensões (`320x420`). |
| **Visor** | `tk.Entry()` | Exibe a expressão matemática e o resultado alinhado à direita. |
| **Estado Reativo** | `tk.StringVar()` | Sincroniza dinamicamente o valor do visor em tempo real via `.set()` e `.get()`. |
| **Botões** | `tk.Button()` | Disparam as ações usando funções anônimas `lambda`. |
| **Layout** | `widget.grid()` | Posiciona cada elemento em linhas e colunas com `columnspan` e `weight`. |
| **Event Loop** | `janela.mainloop()` | Mantém o programa ativo escutando eventos de cliques e teclas. |

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem Principal**: Python 3.x
* **Biblioteca Gráfica**: Tkinter (Standard GUI Library)
* **Simulador & Demonstração Web**: React 19, TypeScript, Tailwind CSS
* **Hospedagem em Nuvem**: Google Cloud Run (Serverless Container em `europe-west2`)

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte `LICENSE` para mais informações.
