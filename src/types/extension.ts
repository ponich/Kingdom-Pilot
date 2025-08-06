export interface ChromeMessage {
  type: string;
  data?: unknown;
  tabId?: number;
}
