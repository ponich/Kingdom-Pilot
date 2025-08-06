import { injectScript } from '@/extension';

injectScript(chrome.runtime.getURL('content-entry.js'), 'body');