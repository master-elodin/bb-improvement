export type IStyle = { [selector: string]: Record<string, string | number> };

/** Preventing needing to write style={} for all components, but still having styling in the js file. */
export const InlineStyle = (styleConfig: IStyle) => {
  const sheets = [...document.getElementsByTagName('link')];
  // clear any existing styles first to prevent Bitbucket styles from messing with the script
  // https://stackoverflow.com/a/9252908
  sheets.forEach((x) => {
    const type = x.getAttribute('type');
    if (type?.toLowerCase() === 'text/css' || x.getAttribute('rel') === 'stylesheet') {
      x.parentNode?.removeChild(x);
    }
  });
  // @ts-ignore: this will work in actual bitbucket but not locally
  jQuery('html').attr('data-theme', '');

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
  }`;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = styleString;
  document.getElementsByTagName('head')[0].appendChild(style);
};
