const fse = require('fs-extra');

const [srcDir, destDir] =  process.argv.slice(2);

// To copy a folder or file
fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
  if (err) {
    console.error(err);      // add if you want to replace existing folder or file with same name
  } else {
    console.log("success!");
  }
});
