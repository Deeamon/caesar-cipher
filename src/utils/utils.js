const chalk = require('chalk');
const optionsList = require('../config/commandOptions.json');
const errChalk = chalk.red.bold;

const comandInParse = (parseCmd, optionCmd) => {
  return parseCmd.find(({ option }) => {
    return Object.values(optionCmd).includes(option);
  });
};

const isRequiredCmd = (parseCmd) => {
  const requiredCommands = optionsList.filter(({ isRequired }) => isRequired);
  requiredCommands.forEach((command) => {
    if (parseCmd.includes(command.alias) || parseCmd.includes(command.full))
      return;

    process.stderr.write(
      errChalk(
        `Missed required parameter [${command.full.slice(
          2
        )}] for command execution. \n`
      )
    );
    process.exit(235);
  });
};

const isDublicateCmd = (parseCmd) => {
  const temp = {};
  parseCmd
    .filter((com) => com[0] === '-')
    .forEach((item) => {
      temp[item] ? temp[item]++ : (temp[item] = 1);
    });

  const isDubl = Object.values(temp).some((item) => item > 1);
  if (!isDubl) return;

  throw new Error(errChalk(`Error: options are repeated `));
};

const validate = (parseCmd) => {
  isRequiredCmd(parseCmd);
  isDublicateCmd(parseCmd);
};

const parseCmdOptions = () => {
  const optionsRaw = process.argv.slice(2);
  validate(optionsRaw);
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

const checkActionValue = () => {
  const action = optionsList[3];
  const option = comandInParse(parseCmdOptions(), action);
  const values = ['encode', 'decode'];

  if (values.includes(option.value)) return;
  throw new Error(
    errChalk(`
      Invalid value for action. Possible values is: [${values[0]} || ${values[1]}]
  `)
  );
};
const checkShiftValue = () => {
  const shift = optionsList[0];
  const option = comandInParse(parseCmdOptions(), shift);
  if (!isNaN(option.value)) return;
  throw new Error(
    errChalk(`
      Invalid value for shift. The shift option accepts only numbers as a value!
  `)
  );
};

const parseCmdV = () => {
  checkActionValue();
  checkShiftValue();
  return parseCmdOptions();
};

module.exports = { comandInParse, parseCmdV };
