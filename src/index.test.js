const licenses = require('./');

describe('licenses-list-generator', () => {
  test('should export a function', () => {
    expect(typeof licenses).toEqual('function');
  });
});
