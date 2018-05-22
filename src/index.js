const fs = require('fs');

const projectPath = process.cwd();
const licenses = [];
const paths = [];

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
  const possibleNames = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'LICENCE', 'LICENSE.markdown'];
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

module.exports = () => getLicenses(projectPath);
