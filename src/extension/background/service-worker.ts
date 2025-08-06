import { Logger } from '@/utils';

const logger = Logger.getInstance();

class BackgroundService {
  private timer: ReturnType<typeof setInterval> | null = null;
  private readonly HEARTBEAT_INTERVAL = 30000; // 30 seconds

  public start(): void {
    logger.info('Kingdom Pilot background service starting');

    this.startHeartbeat();

    logger.info('Background service initialized');
  }

  private startHeartbeat(): void {
    this.timer = setInterval(() => {
      const timestamp = new Date().getTime();
      logger.debug('Background service heartbeat', timestamp);
    }, this.HEARTBEAT_INTERVAL);
  }

  public stopHeartbeat(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    logger.info('Background service stopped');
  }
}

// Start the service
const backgroundService = new BackgroundService();
backgroundService.start();