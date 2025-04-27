export interface EditorTheme {
  background: string;
  containerBackground: string;
  textColor: string;
  lineNumbersColor: string;
  lineNumbersBorder: string;
  // Syntax highlighting colors
  colors: {
    comment: string;
    string: string;
    number: string;
    function: string;
    keyword: string;
    operator: string;
    variable: string;
  };
}

export const themes = {
  dark: {
    background: "#1a1a1a",
    containerBackground: "#2d2d2d",
    textColor: "#fff",
    lineNumbersColor: "#666",
    lineNumbersBorder: "#444",
    colors: {
      comment: "#6a9955",
      string: "#ce9178",
      number: "#b5cea8",
      function: "#dcdcaa",
      keyword: "#569cd6",
      operator: "#d4d4d4",
      variable: "#9cdcfe",
    },
  },
  monokai: {
    background: "#272822",
    containerBackground: "#1e1f1c",
    textColor: "#f8f8f2",
    lineNumbersColor: "#90908a",
    lineNumbersBorder: "#464741",
    colors: {
      comment: "#75715e",
      string: "#e6db74",
      number: "#ae81ff",
      function: "#a6e22e",
      keyword: "#f92672",
      operator: "#f8f8f2",
      variable: "#66d9ef",
    },
  },
  github: {
    background: "#ffffff",
    containerBackground: "#f6f8fa",
    textColor: "#24292e",
    lineNumbersColor: "#6e7781",
    lineNumbersBorder: "#d0d7de",
    colors: {
      comment: "#6a737d",
      string: "#032f62",
      number: "#005cc5",
      function: "#6f42c1",
      keyword: "#d73a49",
      operator: "#24292e",
      variable: "#e36209",
    },
  },
  dracula: {
    background: "#282a36",
    containerBackground: "#1e1f29",
    textColor: "#f8f8f2",
    lineNumbersColor: "#6272a4",
    lineNumbersBorder: "#44475a",
    colors: {
      comment: "#6272a4",
      string: "#f1fa8c",
      number: "#bd93f9",
      function: "#50fa7b",
      keyword: "#ff79c6",
      operator: "#f8f8f2",
      variable: "#8be9fd",
    },
  },
} as const;

export type ThemeName = keyof typeof themes;
