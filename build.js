'use strict';

const fs = require('fs');
const { exec } = require('child_process');

let filesArr;

fs.readdir('src/js/', function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  filesArr = files;

  filesArr.forEach(element => {
    let npmScript;

    if (element.includes('.js')) {
      npmScript = `uglifyjs -o --compress --mangle --output public/js/${element.substring(0, element.indexOf('.'))}.min.js -- src/js/${element}`;
    } else {
      npmScript = `mkdir -p public/js/${element}/ && uglifyjs -o --compress --mangle --output public/js/${element}/${element}.min.js -- src/js/${element}/*.js`;
    }

    exec(npmScript, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        // node couldn't execute the command
        return;
      }

      console.log('success!');
    });
    
  });
  
});