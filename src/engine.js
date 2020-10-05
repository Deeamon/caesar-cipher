const fs = require('fs');
const stream = require('stream');
const { pipeline } = require('stream');
const chalk = require('chalk');

const optionsList = require('./utils/commandOptions.json');
const caesarCipher = require('./utils/caesarCipher');

const errChalk = chalk.red.bold;
const instChalk = chalk.blue.bold;

const parseCmdOptions = () => {
  const optionsRaw = process.argv.slice(2);
  const commands = optionsRaw.map((option, index) => {
    const isOptionExist = optionsList.filter(
      (o) => o.alias === option || o.full === option
    );
    return isOptionExist.length
      ? {
          option,
          value: optionsRaw[index + 1],
        }
      : null;
  });

  return commands.filter((el) => el !== null);
};
const parse = parseCmdOptions();

const comandInParse = (parseCmd, optionCmd) => {
  return parseCmd.find(({ option }) =>
    Object.values(optionCmd).includes(option)
  );
};

const shift = optionsList[0];
const input = optionsList[1];
const output = optionsList[2];
const action = optionsList[3];

const readText = () => {
  if (comandInParse(parse, input)) {
    const filePathInput = comandInParse(parse, input).value;
    return new Promise((res, rej) => {
      fs.access(filePathInput, (err) => {
        if (err) {
          process.stderr.write(
            errChalk(
              `Сannot find the file in path: "${filePathInput}" or it has no read rights :С \n`
            )
          );
          process.exit(453);
        }

        res(fs.createReadStream(filePathInput));
      });
    });
  } else {
    console.log(
      instChalk(`Write text to ${comandInParse(parse, action).value}...`)
    );
    return process.stdin;
  }
};

const transformText = () => {
  class CaesarCipherTransformer extends stream.Transform {
    _transform(data, encoding, callback) {
      const ciphred = caesarCipher(
        data,
        +comandInParse(parse, shift).value,
        comandInParse(parse, action).value
      );
      this.push(ciphred);
      callback();
    }
  }
  return new CaesarCipherTransformer();
};

const writeText = () => {
  if (comandInParse(parse, output)) {
    const filePathOutput = comandInParse(parse, output).value;

    return new Promise((res, rej) => {
      fs.access(filePathOutput, (err) => {
        if (err) {
          process.stderr.write(
            errChalk(
              `Сannot find the file in path: "${filePathOutput}" or it has no read rights :С \n`
            )
          );
          process.exit(453);
        }

        res(fs.createWriteStream(filePathOutput));
      });
    });
  } else {
    return process.stdout;
  }
};

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
