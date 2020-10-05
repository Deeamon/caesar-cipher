# Caesar cipher CLI tool

CLI tool that will encode and decode a text (only English alphabet) by Caesar cipher.

## How to install:

1. Clone this repo
2. Go to the folder, e.g. `cd caesar-cipher`
3. `yarn`

##  How to use:

To To run program write: `src/index.js <option>`

Available options:
- -s, --shift: a number of character to cipher
- -i, --input: an input file (optional)
- -o, --output: an output file (optional)
- -a, --action: an action encode / decode 

Example: 

`node src/index.js -a encode --shift 2`

`node src/index.js -a decode --shift 2`

`node src/index.js -a encode --shift 2 --input ./input.txt --output ./output.txt`
