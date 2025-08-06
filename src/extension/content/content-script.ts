import { Logger } from '@/utils';
import { GameEntityType, GameResponse } from '@/types';

const logger = Logger.getInstance();


export const getResponseEntityType = (response?: GameResponse): GameEntityType => {
  return response?.g?.ne ?? 'unknown';
};

export const interceptResponse = async (...args: unknown[]) => {
  if (args?.[0] && typeof args[0] === 'object' && args[0] !== null) {
    const response = args[0] as GameResponse;
    if (!response?.body) return;
    
    const entityType = getResponseEntityType(response.body);

    logger.debug(`Response Type: ${entityType}`);
  }
}

export function startExtensionContent(): void {
  (window as unknown as Record<string, unknown>)['u4d'] = function u4d(successCallback: Function, failureCallback: Function) {
    this.onSuccess = (...args: unknown[]) => {
      interceptResponse(...args).catch(error => {
        logger.error('Error in response interceptor:', error);
      });

      return successCallback.apply(this, args);
    };

    this.onFailure = (...args: unknown[]) => {
      return failureCallback.apply(this, args);
    };
  };
}