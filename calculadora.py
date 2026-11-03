"""
Calculadora Simples com Interface Gráfica (Tkinter)
Suporta as 4 operações matemáticas básicas: Adição, Subtração, Multiplicação e Divisão.
Implementa avaliação segura de expressões matemáticas via AST.
"""

import ast
import operator
import tkinter as tk

# -------------------------------------------------------------
# MAPEAMENTO DE OPERADORES MATEMÁTICOS SUPORTADOS (AST SEGURO)
# -------------------------------------------------------------
OPERADORES_SUPORTADOS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.USub: operator.neg,
    ast.UAdd: operator.pos,
}

# -------------------------------------------------------------
# 1. FUNÇÕES DE CONTROLE DA CALCULADORA
# -------------------------------------------------------------

def avaliar_nodo_ast(nodo):
    """Avalia nós da árvore sintática (AST) de forma segura, permitindo apenas aritmética."""
    if isinstance(nodo, ast.Expression):
        return avaliar_nodo_ast(nodo.body)
    elif isinstance(nodo, ast.Constant):
        if isinstance(nodo.value, (int, float)):
            return nodo.value
        raise ValueError("Constante não numérica não permitida.")
    elif isinstance(nodo, ast.BinOp):
        tipo_op = type(nodo.op)
        if tipo_op not in OPERADORES_SUPORTADOS:
            raise ValueError(f"Operador binário não suportado: {tipo_op}")
        esquerda = avaliar_nodo_ast(nodo.left)
        direita = avaliar_nodo_ast(nodo.right)
        return OPERADORES_SUPORTADOS[tipo_op](esquerda, direita)
    elif isinstance(nodo, ast.UnaryOp):
        tipo_op = type(nodo.op)
        if tipo_op not in OPERADORES_SUPORTADOS:
            raise ValueError(f"Operador unário não suportado: {tipo_op}")
        operando = avaliar_nodo_ast(nodo.operand)
        return OPERADORES_SUPORTADOS[tipo_op](operando)
    raise ValueError(f"Expressão inválida ou não permitida: {type(nodo)}")


def inserir_caractere(caractere):
    """Insere números ou operadores no visor da calculadora."""
    texto_atual = visor_var.get()
    
    # Se o visor estiver com '0' ou mensagem de erro
    if texto_atual == "0" or "Erro" in texto_atual:
        if caractere == ".":
            visor_var.set("0.")
        elif caractere in ['+', '-', '×', '÷']:
            visor_var.set("0" + caractere)
        else:
            visor_var.set(caractere)
    else:
        # Se o último caractere for operador e usuário inserir ponto, adiciona '0.'
        if caractere == "." and texto_atual and texto_atual[-1] in ['+', '-', '×', '÷']:
            visor_var.set(texto_atual + "0.")
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


def calcular_resultado():
    """Avalia a expressão matemática de forma segura com AST e exibe o resultado."""
    expressao = visor_var.get()
    
    # Substitui os símbolos visuais pelos operadores matemáticos do Python
    expressao_python = expressao.replace('×', '*').replace('÷', '/')
    
    try:
        arvore = ast.parse(expressao_python, mode='eval')
        resultado = avaliar_nodo_ast(arvore)
        
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

# Atalhos do teclado físico
janela.bind("<Return>", lambda event: calcular_resultado())
janela.bind("<KP_Enter>", lambda event: calcular_resultado())
janela.bind("<BackSpace>", lambda event: apagar_ultimo())
janela.bind("<Escape>", lambda event: limpar_visor())

# -------------------------------------------------------------
# 6. INICIA O LOOP DE EVENTOS DA INTERFACE GRÁFICA
# -------------------------------------------------------------
if __name__ == "__main__":
    janela.mainloop()
