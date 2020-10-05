const { pipeline } = require('stream');
const { readText, transformText, writeText } = require('./utils/stream');

async function execute() {
  pipeline(await readText(), transformText(), await writeText(), (err) => {
    if (err) {
      console.error('Encryption failed!', err);
    } else {
      console.log('Encryption was a success!');
    }
  });
}

execute();
