export function injectScript(filePath: string, tag: string = 'body'): void {
  const targetNode = document.getElementsByTagName(tag)[0];
  
  if (!targetNode) {
    console.error(`Could not find ${tag} element for script injection`);
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  
  targetNode.appendChild(script);
}