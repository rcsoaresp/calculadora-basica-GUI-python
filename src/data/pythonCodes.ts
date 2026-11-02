import { PythonConfig } from '../types/calculator';

export const PYTHON_SIMPLE_CODE = `"""
Calculadora Simples com Interface Gráfica (Tkinter)
Suporta as 4 operações matemáticas básicas: Adição, Subtração, Multiplicação e Divisão.
"""

import tkinter as tk
from tkinter import messagebox

# -------------------------------------------------------------
# 1. FUNÇÕES DE CONTROLE DA CALCULADORA
# -------------------------------------------------------------

def inserir_caractere(caractere):
    """Insere números ou operadores no visor da calculadora."""
    texto_atual = visor_var.get()
    
    # Se o visor estiver com '0' ou mensagem de erro, substitui pelo caractere
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
    """Avalia a expressão matemática e exibe o resultado."""
    expressao = visor_var.get()
    
    # Substitui os símbolos visuais pelos operadores matemáticos do Python
    expressao_python = expressao.replace('×', '*').replace('÷', '/')
    
    try:
        # Avalia a expressão de forma segura
        resultado = eval(expressao_python)
        
        # Formata números inteiros sem casa decimal (ex: 5.0 vira 5)
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
janela.resizable(False, False)  # Trava o redimensionamento da janela
janela.config(bg="#f3f4f6")     # Cor de fundo

# Variável de texto sincronizada com o visor
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
    justify="right",           # Números alinhados à direita
    bd=0,
    highlightthickness=2,
    highlightbackground="#d1d5db",
    highlightcolor="#2563eb"
)
# Posiciona o visor no topo, ocupando 4 colunas com margens
visor.grid(row=0, column=0, columnspan=4, padx=12, pady=16, ipady=12, sticky="nsew")

# -------------------------------------------------------------
# 4. DEFINIÇÃO DA GRADE DE BOTÕES (Matriz 4x5)
# -------------------------------------------------------------
botoes = [
    ('C', 1, 0), ('CE', 1, 1), ('⌫', 1, 2), ('÷', 1, 3),
    ('7', 2, 0), ('8', 2, 1),  ('9', 2, 2), ('×', 2, 3),
    ('4', 3, 0), ('5', 3, 1),  ('6', 3, 2), ('-', 3, 3),
    ('1', 4, 0), ('2', 4, 1),  ('3', 4, 2), ('+', 4, 3),
    ('0', 5, 0), ('.', 5, 1),  ('±', 5, 2), ('=', 5, 3)
]

def inverter_sinal():
    """Inverte o sinal do número atual (positivo/negativo)."""
    try:
        valor = float(visor_var.get())
        if valor.is_integer():
            visor_var.set(str(int(-valor)))
        else:
            visor_var.set(str(-valor))
    except Exception:
        pass

# -------------------------------------------------------------
# 5. CRIAÇÃO DOS BOTÕES COM tk.Button E grid()
# -------------------------------------------------------------
for texto, linha, coluna in botoes:
    # Cores personalizadas para botões de controle, números e operadores
    if texto in ['+', '-', '×', '÷']:
        bg_cor = "#2563eb"    # Azul para operadores
        fg_cor = "#ffffff"
        comando = lambda t=texto: inserir_caractere(t)
    elif texto == '=':
        bg_cor = "#16a34a"    # Verde para o botão de resultado
        fg_cor = "#ffffff"
        comando = calcular_resultado
    elif texto in ['C', 'CE']:
        bg_cor = "#dc2626"    # Vermelho para limpar
        fg_cor = "#ffffff"
        comando = limpar_visor
    elif texto == '⌫':
        bg_cor = "#ea580c"    # Laranja para apagar
        fg_cor = "#ffffff"
        comando = apagar_ultimo
    elif texto == '±':
        bg_cor = "#e5e7eb"
        fg_cor = "#1f2937"
        comando = inverter_sinal
    else:
        bg_cor = "#ffffff"    # Branco para os dígitos numéricos
        fg_cor = "#1f2937"
        comando = lambda t=texto: inserir_caractere(t)

    botao = tk.Button(
        janela,
        text=texto,
        font=("Arial", 14, "bold"),
        bg=bg_cor,
        fg=fg_cor,
        activebackground="#93c5fd",
        activeforeground="#1e3a8a",
        bd=0,
        relief="flat",
        cursor="hand2",
        command=comando
    )
    # Insere o botão na grade com espaçamento uniforme
    botao.grid(row=linha, column=coluna, padx=4, pady=4, sticky="nsew")

# Configura as linhas e colunas para expandirem uniformemente
for i in range(4):
    janela.grid_columnconfigure(i, weight=1)
for i in range(1, 6):
    janela.grid_rowconfigure(i, weight=1)

# -------------------------------------------------------------
# 6. INICIA O LOOP DE EVENTOS DA INTERFACE GRÁFICA
# -------------------------------------------------------------
if __name__ == "__main__":
    janela.mainloop()
`;

export const PYTHON_OOP_CODE = `"""
Calculadora Orientada a Objetos com Tkinter e Suporte a Teclado
Estrutura profissional com classe, modularidade e tratamento robusto.
"""

import tkinter as tk
from tkinter import ttk

class CalculadoraApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Calculadora Python (POO)")
        self.root.geometry("340x440")
        self.root.resizable(False, False)
        self.root.configure(bg="#1e1e2e")

        self.expressao_completa = ""
        self.visor_var = tk.StringVar(value="0")
        self.historico_var = tk.StringVar(value="")

        self._configurar_interface()
        self._vincular_teclado()

    def _configurar_interface(self):
        """Cria e organiza todos os widgets da calculadora."""
        
        # Frame do visor
        frame_visor = tk.Frame(self.root, bg="#1e1e2e")
        frame_visor.pack(padx=16, pady=16, fill="x")

        # Subvisor (exibe o histórico da conta)
        lbl_historico = tk.Label(
            frame_visor,
            textvariable=self.historico_var,
            font=("Arial", 10),
            bg="#1e1e2e",
            fg="#9399b2",
            anchor="e"
        )
        lbl_historico.pack(fill="x")

        # Visor principal
        entry_visor = tk.Entry(
            frame_visor,
            textvariable=self.visor_var,
            font=("Consolas", 24, "bold"),
            bg="#181825",
            fg="#cdd6f4",
            justify="right",
            bd=0,
            relief="flat",
            highlightthickness=1,
            highlightbackground="#45475a"
        )
        entry_visor.pack(fill="x", ipady=8, pady=(4, 0))

        # Frame da grade de botões
        frame_botoes = tk.Frame(self.root, bg="#1e1e2e")
        frame_botoes.pack(padx=12, pady=(0, 16), fill="both", expand=True)

        layout_botoes = [
            [("C", "limpar"), ("CE", "limpar"), ("⌫", "apagar"), ("÷", "operador")],
            [("7", "numero"), ("8", "numero"), ("9", "numero"), ("×", "operador")],
            [("4", "numero"), ("5", "numero"), ("6", "numero"), ("-", "operador")],
            [("1", "numero"), ("2", "numero"), ("3", "numero"), ("+", "operador")],
            [("±", "inverter"), ("0", "numero"), (".", "numero"), ("=", "calcular")]
        ]

        estilos = {
            "numero":   {"bg": "#313244", "fg": "#cdd6f4", "active": "#45475a"},
            "operador": {"bg": "#89b4fa", "fg": "#11111b", "active": "#b4befe"},
            "calcular": {"bg": "#a6e3a1", "fg": "#11111b", "active": "#94e2d5"},
            "limpar":   {"bg": "#f38ba8", "fg": "#11111b", "active": "#eba0ac"},
            "apagar":   {"bg": "#fab387", "fg": "#11111b", "active": "#f9e2af"},
            "inverter": {"bg": "#45475a", "fg": "#cdd6f4", "active": "#585b70"}
        }

        for r_idx, linha in enumerate(layout_botoes):
            frame_botoes.grid_rowconfigure(r_idx, weight=1)
            for c_idx, (rotulo, tipo) in enumerate(linha):
                frame_botoes.grid_columnconfigure(c_idx, weight=1)
                
                estilo = estilos[tipo]
                btn = tk.Button(
                    frame_botoes,
                    text=rotulo,
                    font=("Arial", 13, "bold"),
                    bg=estilo["bg"],
                    fg=estilo["fg"],
                    activebackground=estilo["active"],
                    bd=0,
                    relief="flat",
                    cursor="hand2",
                    command=lambda t=rotulo, tp=tipo: self._ao_clicar_botao(t, tp)
                )
                btn.grid(row=r_idx, column=c_idx, padx=4, pady=4, sticky="nsew")

    def _ao_clicar_botao(self, rotulo, tipo):
        """Gerencia os eventos de clique dos botões."""
        if tipo == "numero":
            self.adicionar_digito(rotulo)
        elif tipo == "operador":
            self.adicionar_operador(rotulo)
        elif tipo == "calcular":
            self.calcular()
        elif tipo == "limpar":
            self.limpar()
        elif tipo == "apagar":
            self.apagar_ultimo()
        elif tipo == "inverter":
            self.inverter_sinal()

    def adicionar_digito(self, digito):
        atual = self.visor_var.get()
        if atual == "0" or "Erro" in atual:
            self.visor_var.set(digito)
        else:
            # Evita múltiplos pontos decimais em um mesmo número
            if digito == "." and "." in atual.split()[-1]:
                return
            self.visor_var.set(atual + digito)

    def adicionar_operador(self, operador):
        atual = self.visor_var.get()
        if "Erro" in atual:
            return
        
        # Evita operador duplicado no final
        if atual and atual[-1] in ['+', '-', '×', '÷']:
            atual = atual[:-1]
            
        self.visor_var.set(atual + operador)

    def calcular(self):
        expressao = self.visor_var.get()
        if not expressao or "Erro" in expressao:
            return

        # Guarda no histórico
        self.historico_var.set(expressao + " =")
        
        expressao_py = expressao.replace('×', '*').replace('÷', '/')
        try:
            resultado = eval(expressao_py)
            if isinstance(resultado, float) and resultado.is_integer():
                resultado = int(resultado)
            self.visor_var.set(str(resultado))
        except ZeroDivisionError:
            self.visor_var.set("Erro: Divisão por 0")
        except Exception:
            self.visor_var.set("Erro de Sintaxe")

    def limpar(self):
        self.visor_var.set("0")
        self.historico_var.set("")

    def apagar_ultimo(self):
        atual = self.visor_var.get()
        if len(atual) > 1 and "Erro" not in atual:
            self.visor_var.set(atual[:-1])
        else:
            self.visor_var.set("0")

    def inverter_sinal(self):
        try:
            val = float(self.visor_var.get())
            self.visor_var.set(str(int(-val) if val.is_integer() else -val))
        except Exception:
            pass

    def _vincular_teclado(self):
        """Permite operar a calculadora diretamente pelo teclado físico."""
        self.root.bind("<Return>", lambda event: self.calcular())
        self.root.bind("<KP_Enter>", lambda event: self.calcular())
        self.root.bind("<BackSpace>", lambda event: self.apagar_ultimo())
        self.root.bind("<Escape>", lambda event: self.limpar())
        self.root.bind("<Key>", self._tratar_tecla)

    def _tratar_tecla(self, event):
        caractere = event.char
        if caractere in "0123456789.":
            self.adicionar_digito(caractere)
        elif caractere in "+-":
            self.adicionar_operador(caractere)
        elif caractere == "*":
            self.adicionar_operador("×")
        elif caractere == "/":
            self.adicionar_operador("÷")
        elif caractere == "=":
            self.calcular()


if __name__ == "__main__":
    root = tk.Tk()
    app = CalculadoraApp(root)
    root.mainloop()
`;

export const PYTHON_TTK_CODE = `"""
Calculadora Tkinter com Tema Moderno Nativo (ttk.Style)
Utiliza os controles atualizados do Ttk para integração visual com o SO.
"""

import tkinter as tk
from tkinter import ttk

def main():
    janela = tk.Tk()
    janela.title("Calculadora ttk")
    janela.geometry("320x420")
    janela.resizable(False, False)

    # Configuração de estilo ttk
    estilo = ttk.Style()
    # Usa tema do sistema se disponível ('clam', 'alt', 'default', 'vista')
    temas_disponiveis = estilo.theme_names()
    if 'clam' in temas_disponiveis:
        estilo.theme_use('clam')

    estilo.configure("TButton", font=("Arial", 12, "bold"), padding=6)
    estilo.configure("Operador.TButton", foreground="#0d6efd")
    estilo.configure("Igual.TButton", foreground="#198754")
    estilo.configure("Limpar.TButton", foreground="#dc3545")

    visor_texto = tk.StringVar(value="0")

    # Visor
    entry_visor = ttk.Entry(
        janela,
        textvariable=visor_texto,
        font=("Consolas", 20, "bold"),
        justify="right"
    )
    entry_visor.pack(padx=12, pady=16, fill="x", ipady=8)

    # Ações
    def inserir(val):
        atual = visor_texto.get()
        if atual == "0" or "Erro" in atual:
            visor_texto.set(val)
        else:
            visor_texto.set(atual + val)

    def limpar():
        visor_texto.set("0")

    def apagar():
        atual = visor_texto.get()
        if len(atual) > 1 and "Erro" not in atual:
            visor_texto.set(atual[:-1])
        else:
            visor_texto.set("0")

    def calcular():
        expr = visor_texto.get().replace('×', '*').replace('÷', '/')
        try:
            res = eval(expr)
            visor_texto.set(str(int(res) if isinstance(res, float) and res.is_integer() else res))
        except ZeroDivisionError:
            visor_texto.set("Erro: Divisão por 0")
        except Exception:
            visor_texto.set("Erro")

    # Frame de botões
    frame_grid = ttk.Frame(janela)
    frame_grid.pack(padx=10, pady=10, fill="both", expand=True)

    botoes = [
        [("C", limpar, "Limpar.TButton"), ("⌫", apagar, "TButton"), ("%", lambda: None, "TButton"), ("÷", lambda: inserir("÷"), "Operador.TButton")],
        [("7", lambda: inserir("7"), "TButton"), ("8", lambda: inserir("8"), "TButton"), ("9", lambda: inserir("9"), "TButton"), ("×", lambda: inserir("×"), "Operador.TButton")],
        [("4", lambda: inserir("4"), "TButton"), ("5", lambda: inserir("5"), "TButton"), ("6", lambda: inserir("6"), "TButton"), ("-", lambda: inserir("-"), "Operador.TButton")],
        [("1", lambda: inserir("1"), "TButton"), ("2", lambda: inserir("2"), "TButton"), ("3", lambda: inserir("3"), "TButton"), ("+", lambda: inserir("+"), "Operador.TButton")],
        [("0", lambda: inserir("0"), "TButton"), (".", lambda: inserir("."), "TButton"), ("±", lambda: None, "TButton"), ("=", calcular, "Igual.TButton")]
    ]

    for r, linha in enumerate(botoes):
        frame_grid.rowconfigure(r, weight=1)
        for c, (texto, comando, style_name) in enumerate(linha):
            frame_grid.columnconfigure(c, weight=1)
            btn = ttk.Button(frame_grid, text=texto, command=comando, style=style_name)
            btn.grid(row=r, column=c, padx=3, pady=3, sticky="nsew")

    janela.mainloop()

if __name__ == "__main__":
    main()
`;

export function generateCustomPythonCode(config: PythonConfig): string {
  const { windowTitle, width, height, fontSize, themeStyle, enableKeyboardShortcuts } = config;

  let bgHex = "#f3f4f6";
  let visorBg = "#ffffff";
  let visorFg = "#111827";
  let numBg = "#ffffff";
  let numFg = "#1f2937";
  let opBg = "#2563eb";
  let opFg = "#ffffff";
  let eqBg = "#16a34a";
  let clrBg = "#dc2626";

  if (themeStyle === 'modern') {
    bgHex = "#181825";
    visorBg = "#11111b";
    visorFg = "#cdd6f4";
    numBg = "#313244";
    numFg = "#cdd6f4";
    opBg = "#89b4fa";
    opFg = "#11111b";
    eqBg = "#a6e3a1";
    clrBg = "#f38ba8";
  } else if (themeStyle === 'ttk') {
    bgHex = "#e5e7eb";
    visorBg = "#f9fafb";
    visorFg = "#0f172a";
    numBg = "#f1f5f9";
    numFg = "#0f172a";
    opBg = "#3b82f6";
    opFg = "#ffffff";
    eqBg = "#10b981";
    clrBg = "#ef4444";
  }

  const keyboardCode = enableKeyboardShortcuts
    ? `
# Atalhos de Teclado Vinculados
janela.bind("<Return>", lambda event: calcular())
janela.bind("<KP_Enter>", lambda event: calcular())
janela.bind("<BackSpace>", lambda event: apagar())
janela.bind("<Escape>", lambda event: limpar())
janela.bind("<Key>", lambda e: inserir(e.char) if e.char in "0123456789.+-*/" else None)
`
    : '';

  return `"""
Calculadora Python Tkinter Personalizada
Gerada automaticamente com as configurações do usuário.
"""

import tkinter as tk

def inserir(char):
    if char == '*': char = '×'
    if char == '/': char = '÷'
    atual = visor_var.get()
    if atual == "0" or "Erro" in atual:
        visor_var.set(char)
    else:
        visor_var.set(atual + char)

def limpar():
    visor_var.set("0")

def apagar():
    atual = visor_var.get()
    if len(atual) > 1 and "Erro" not in atual:
        visor_var.set(atual[:-1])
    else:
        visor_var.set("0")

def calcular():
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

# Configuração da Janela
janela = tk.Tk()
janela.title("${windowTitle}")
janela.geometry("${width}x${height}")
janela.resizable(False, False)
janela.config(bg="${bgHex}")

visor_var = tk.StringVar(value="0")

# Visor
visor = tk.Entry(
    janela,
    textvariable=visor_var,
    font=("Arial", ${fontSize}, "bold"),
    bg="${visorBg}",
    fg="${visorFg}",
    justify="right",
    bd=0,
    highlightthickness=2,
    highlightbackground="#cbd5e1"
)
visor.grid(row=0, column=0, columnspan=4, padx=12, pady=16, ipady=10, sticky="nsew")

botoes = [
    ('C', 1, 0, '${clrBg}', '#ffffff', limpar),
    ('CE', 1, 1, '${clrBg}', '#ffffff', limpar),
    ('⌫', 1, 2, '#ea580c', '#ffffff', apagar),
    ('÷', 1, 3, '${opBg}', '${opFg}', lambda: inserir('÷')),
    ('7', 2, 0, '${numBg}', '${numFg}', lambda: inserir('7')),
    ('8', 2, 1, '${numBg}', '${numFg}', lambda: inserir('8')),
    ('9', 2, 2, '${numBg}', '${numFg}', lambda: inserir('9')),
    ('×', 2, 3, '${opBg}', '${opFg}', lambda: inserir('×')),
    ('4', 3, 0, '${numBg}', '${numFg}', lambda: inserir('4')),
    ('5', 3, 1, '${numBg}', '${numFg}', lambda: inserir('5')),
    ('6', 3, 2, '${numBg}', '${numFg}', lambda: inserir('6')),
    ('-', 3, 3, '${opBg}', '${opFg}', lambda: inserir('-')),
    ('1', 4, 0, '${numBg}', '${numFg}', lambda: inserir('1')),
    ('2', 4, 1, '${numBg}', '${numFg}', lambda: inserir('2')),
    ('3', 4, 2, '${numBg}', '${numFg}', lambda: inserir('3')),
    ('+', 4, 3, '${opBg}', '${opFg}', lambda: inserir('+')),
    ('0', 5, 0, '${numBg}', '${numFg}', lambda: inserir('0')),
    ('.', 5, 1, '${numBg}', '${numFg}', lambda: inserir('.')),
    ('±', 5, 2, '#94a3b8', '#0f172a', lambda: None),
    ('=', 5, 3, '${eqBg}', '#ffffff', calcular)
]

for texto, lin, col, bg_btn, fg_btn, cmd in botoes:
    btn = tk.Button(
        janela,
        text=texto,
        font=("Arial", 14, "bold"),
        bg=bg_btn,
        fg=fg_btn,
        bd=0,
        relief="flat",
        cursor="hand2",
        command=cmd
    )
    btn.grid(row=lin, column=col, padx=4, pady=4, sticky="nsew")

for i in range(4):
    janela.grid_columnconfigure(i, weight=1)
for i in range(1, 6):
    janela.grid_rowconfigure(i, weight=1)
${keyboardCode}
if __name__ == "__main__":
    janela.mainloop()
`;
}
