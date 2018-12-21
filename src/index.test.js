const licenses = require('./');

const projectPath = process.cwd();

describe('licenses-list-generator', () => {
  beforeAll(() => {
    jest.spyOn(process, 'cwd').mockReturnValue(`${projectPath}/mocked_project`);
  });

  test('should export a function', () => {
    expect(typeof licenses).toEqual('function');
  });

  test('should return array of objects', () => {
    const licenseList = licenses();

    expect(licenseList.length).toEqual(3);
    expect(licenseList[0].name).toEqual('baz');
    expect(licenseList[1].name).toEqual('bar');
    expect(licenseList[2].name).toEqual('foo');
  });
});
