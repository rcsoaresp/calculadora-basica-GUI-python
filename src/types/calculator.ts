export type TkTheme = 'classic' | 'modern_dark' | 'clean_light';

export interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
}

export interface PythonConfig {
  windowTitle: string;
  width: number;
  height: number;
  fontSize: number;
  themeStyle: 'classic' | 'modern' | 'ttk';
  enableKeyboardShortcuts: boolean;
  showHistory: boolean;
}
