const fs = require('fs');

const projectPath = process.cwd();
const licenses = [];
const paths = [];
const LICENSE_FILES = [
  'LICENSE',
  'LICENSE.md',
  'LICENSE.txt',
  'LICENCE',
  'LICENSE.markdown',
  'LICENSE-MIT',
  'LICENSE.rst',
];

function log(msg, path) {
  console.log(`licenses-list-generator: ${msg} ${path}`); // eslint-disable-line no-console
}

function isFile(path) {
  return fs.existsSync(path);
}

function getFile(path) {
  return fs.readFileSync(path).toString();
}

function getPackageJson(path = projectPath) {
  const packagePath = `${path}/package.json`;
  let packageObj = {};
  try {
    packageObj = JSON.parse(getFile(packagePath));
  } catch (err) {
    log(err, path);
    packageObj = {
      name: path.split('/')[-1],
      path,
      text: null,
      type: null,
      version: null,
    };
  }
  return packageObj;
}

function getLicenseText(path) {
  const possibleNames = LICENSE_FILES;
  const name = possibleNames.find(fileName => isFile(`${path}/${fileName}`));

  if (!name) {
    log('license file does not exist for', path);
    return null;
  }

  return getFile(`${path}/${name}`);
}

function getLicenses(path = projectPath) {
  const packageJson = getPackageJson(path);

  if (packageJson.dependencies) {
    Object.keys(packageJson.dependencies).forEach((name) => {
      getLicenses(`${projectPath}/node_modules/${name}`);
    });
  } else if (!paths.includes(path)) {
    paths.push(path);

    licenses.push({
      name: packageJson.name,
      path,
      text: getLicenseText(path),
      type: packageJson.license || null,
      version: packageJson.version,
    });
  }

  return licenses;
}

function printLicenses(licensesArray) {
  const stringifyType = (x) => {
    if (x.type === null) {
      x.type = 'NO LICENSE';// eslint-disable-line no-param-reassign
      return x;
    }

    let y = x.type;
    while (typeof y !== 'string') {
      y = y.type;
    }
    x.type = y;// eslint-disable-line no-param-reassign
    return x;
  };

  const rowify = (x) => {
    const path = x.path.split('/');
    const name = x.name || path[path.length - 1];
    return `${name}, ${x.type}`;
  };

  return licensesArray.map(stringifyType).map(rowify).join('\n');
}

function saveLicenses(licensesInpt, path = './licenses.csv') {
  let licenseString = licensesInpt;
  if (typeof licenseString !== 'string') {
    licenseString = printLicenses(licenses);
  }
  fs.writeFile(path, licenseString, 'utf8', (err) => {
    if (err) throw err;
    console.log(`Saved ${path}`); // eslint-disable-line no-console
  });
}

module.exports = {
  get: () => getLicenses(projectPath),
  getLicenses,
  printCsv: printLicenses,
  saveCsv: saveLicenses,
};
