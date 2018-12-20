const fs = require('fs');
const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const licensesList = require('../src/index')();

const licenses = licensesList
  .map(dependency => dependency.text)
  .filter(dependency => typeof dependency === 'string');

const licensesUnique = [...new Set(licenses)];
const separator = '\n--------------------\n\n';
const fileContent = `${licensesUnique.join(separator)}`;

const dir = './static';

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

fs.writeFile(`${dir}/licenses.txt`, fileContent, (err) => {
  if (err) {
    console.error(chalk.red('ERROR: licenses.txt file has NOT been created.\n', err, '\n')); // eslint-disable-line no-console
    return err;
  }
  console.info(chalk.green(`OK: ${dir}/licenses.txt file with ${licenses.length} licenses has been created.\n`)); // eslint-disable-line no-console
});
