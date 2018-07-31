const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

async function copyFile(file) {
  const distPath = path.resolve(__dirname, '../dist/', path.basename(file));
  await fse.copy(file, distPath);
  console.log(`Copied ${file} to ${distPath}`);
}

function typescriptCopy(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8');
  const { jest, scripts, devDependencies, ...packageDataOther } = JSON.parse(
    packageData,
  );
  const newPackageData = {
    ...packageDataOther,
    main: './index.js',
    module: './es/index.js',
    private: false,
  };
  const distPath = path.resolve(__dirname, '../dist/package.json');

  await fse.writeFile(distPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${distPath}`);

  return newPackageData;
}

async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}

async function addLicense(packageData) {
  const license = `/** @license ${packageData.name} v${packageData.version}
 *
 * This source code is licensed under the ${packageData.license} license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  await Promise.all(
    [
      '../dist/index.js',
      '../dist/es/index.js',
    ].map(file => prepend(path.resolve(__dirname, file), license)),
  );
}

async function run() {
  await Promise.all(
    ['./README.md', './CHANGELOG.md', './LICENSE.md'].map(file => copyFile(file)),
  );
  const packageData = await createPackageFile();
  await addLicense(packageData);

  // TypeScript - We don't have any typescript definitions yet, but if someone wants to add them, this will make our life easier.
  const from = path.resolve(__dirname, '../src');
  await Promise.all([
    typescriptCopy(from, path.resolve(__dirname, '../dist')),
    typescriptCopy(from, path.resolve(__dirname, '../dist/es')),
  ]);
}

run();
