const fs = require("fs");
const path = require("path");

const files = ['./js/utils/word.js', "index.html"];

files.forEach((file) => {
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${file} not found, skip`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  const updated = content.replace(/\?v=(\d+)/g, (match, version) => {
    const nextVersion = Number(version) + 1;
    return `?v=${nextVersion}`;
  });

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ ${file}: all ?v=[verionNr] increased`);
  } else {
    console.log(`ℹ️  ${file}: no ?v= found, skip`);
  }
});
