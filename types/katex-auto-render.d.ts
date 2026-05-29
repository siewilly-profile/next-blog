declare module "katex/contrib/auto-render" {
  type Delimiter = {
    left: string;
    right: string;
    display: boolean;
  };

  type RenderMathInElementOptions = {
    delimiters?: Delimiter[];
    throwOnError?: boolean;
    strict?: string | boolean;
    ignoredTags?: string[];
  };

  const renderMathInElement: (element: HTMLElement, options?: RenderMathInElementOptions) => void;
  export default renderMathInElement;
}
