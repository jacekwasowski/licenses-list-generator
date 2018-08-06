const licenses = require('./');

describe('licenses-list-generator', () => {
  test('should export a function', () => {
    expect(typeof licenses).toEqual('function');
  });

  test('should work on this repo (this will break if deps are added)', () => {
    const licenseList = licenses();
    expect(licenseList.length).toEqual(1);
  });
});
