const path = require("path");
const fs = require("fs");
const { chain } = require("lodash");

// 将 DLL 的依赖包及其版本都放到仓库根目录的 `package.json` 的 `devDependencies` 中，
// 以支持 IDE 的 auto-import
module.exports = function syncDllDeps() {
  const rootPackageJsonPath = path.resolve("package.json");
  const rootPackageJson = require(rootPackageJsonPath);
  const devDependencies = rootPackageJson.devDependencies;
  const dllDeps = Object.keys(devDependencies).filter(
    pkg => pkg === "@easyops/brick-dll" || pkg.startsWith("@dll/")
  );

  for (const pkg of dllDeps) {
    // 解决该包在 `npm link` 下使用时报错的问题
    const dllPackageJson = require(require.resolve(`${pkg}/package.json`, {
      paths: [process.cwd()]
    }));
    for (const [name, version] of Object.entries(dllPackageJson.dependencies)) {
      devDependencies[name] = version;
    }
  }

  // 根据包名排序
  rootPackageJson.devDependencies = chain(devDependencies)
    .toPairs()
    .sortBy(0)
    .fromPairs()
    .value();

  fs.writeFileSync(
    rootPackageJsonPath,
    JSON.stringify(rootPackageJson, null, 2)
  );

  // 同时更新 Renovate 配置，DLL 的依赖由 DLL 带动更新，不需要自动更新
  const renovateJsonPath = path.resolve("renovate.json");
  const renovateJson = require(renovateJsonPath);
  const disabledRule = renovateJson.packageRules.find(
    item => item.enabled === false
  );
  const disabledPackageNames = new Set(disabledRule.packageNames);

  for (const pkg of dllDeps) {
    // 解决该包在 `npm link` 下使用时报错的问题
    const dllPackageJson = require(require.resolve(`${pkg}/package.json`, {
      paths: [process.cwd()]
    }));
    for (const name of Object.keys(dllPackageJson.dependencies)) {
      disabledPackageNames.add(name);
    }
  }
  disabledRule.packageNames = Array.from(disabledPackageNames).sort();

  fs.writeFileSync(renovateJsonPath, JSON.stringify(renovateJson, null, 2));
};