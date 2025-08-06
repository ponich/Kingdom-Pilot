export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export class Logger {
  private static instance: Logger;
  private debugEnabled = true;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setDebugEnabled(enabled: boolean): void {
    this.debugEnabled = enabled;
  }

  private formatTime(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}:${ms}`;
  }

  private logWithStyle(
    level: LogLevel,
    message: string,
    ...args: unknown[]
  ): void {
    const time = this.formatTime();
    const colors = {
      [LogLevel.DEBUG]: '#9CA3AF',
      [LogLevel.INFO]: '#3B82F6',
      [LogLevel.WARN]: '#F59E0B',
      [LogLevel.ERROR]: '#EF4444',
    };

    const headerStyle = 'font-weight: bold; font-size: 12px;';
    const timeStyle = 'font-size: 10px; color: #6B7280; font-style: italic;';
    const levelStyle = `color: ${colors[level]}; font-weight: bold; font-size: 11px;`;

    console.groupCollapsed(
      `%cKingdom Pilot%c\t\t%c${time}%c\n%c[${level.toUpperCase()}]%c ${message}`,
      headerStyle,
      '',
      timeStyle,
      '',
      levelStyle,
      'color: inherit;'
    );

    if (args.length > 0) {
      args.forEach((arg) => console.log(arg));
    }

    console.groupEnd();
  }

  public debug(message: string, ...args: unknown[]): void {
    if (this.debugEnabled) {
      this.logWithStyle(LogLevel.DEBUG, message, ...args);
    }
  }

  public info(message: string, ...args: unknown[]): void {
    this.logWithStyle(LogLevel.INFO, message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logWithStyle(LogLevel.WARN, message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logWithStyle(LogLevel.ERROR, message, ...args);
  }
}
