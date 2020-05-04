import utils from '../utils';

export default {
  async getProfile() {
    await utils.delay(50);
    return utils.camelizeKeys({
      accountId: '123124215',
      region: 'sg',
      language: 'en',
    });
  },

  async getChats() {
    return [];
  },
};
