require('paint-console');

export const utils = {
  logger(e) {
    console.info('======== DEBUG ========');
    console.error(e);
    console.info('======== END DEBUG ========');
  }
};
