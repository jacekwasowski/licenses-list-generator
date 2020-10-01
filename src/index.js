const fs = require('fs');
const chalk = require('chalk');

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
  console.log(chalk.red(`licenses-list-generator: ${msg} ${path}`)); // eslint-disable-line no-console
}

function getProjectPath() {
  return process.cwd();
}

function isFile(path) {
  return fs.existsSync(path);
}

function getFile(path) {
  return fs.readFileSync(path).toString();
}

function getPackageJson(path) {
  const packagePath = `${path}/package.json`;
  let packageObj;
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
  const name = LICENSE_FILES.find((fileName) => isFile(`${path}/${fileName}`));

  if (!name) {
    log('License file does not exist for', path);
    return null;
  }

  return getFile(`${path}/${name}`);
}

function getLicenses(path) {
  const {
    dependencies,
    license,
    name,
    version,
  } = getPackageJson(path);

  if (dependencies && Object.keys(dependencies).length > 0) {
    Object.keys(dependencies).forEach((dependency) => {
      getLicenses(`${getProjectPath()}/node_modules/${dependency}`);
    });
  }

  if (!paths.includes(path)) {
    paths.push(path);

    const text = getLicenseText(path);
    if (text) {
      licenses.push({
        name,
        path,
        text,
        type: license,
        version,
      });
    }
  }

  return licenses;
}

module.exports = () => getLicenses(getProjectPath());
