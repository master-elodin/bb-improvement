export type IStyle = { [selector: string]: Record<string, string | number> };

/** Preventing needing to write style={} for all components, but still having styling in the js file. */
export const InlineStyle = (styleConfig: IStyle) => {
  let styleString = '';
  Object.keys(styleConfig).forEach((selector) => {
    const selectorStyle = styleConfig[selector];
    styleString += selector + '{';
    Object.keys(selectorStyle).forEach((key) => {
      styleString += `${key}:${selectorStyle[key]};`;
    });
    styleString += '}';
  });

  styleString += `@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = styleString;
  document.getElementsByTagName('head')[0].appendChild(style);
};
