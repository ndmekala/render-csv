const express = require('express');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
// TODO instead of this, render index.html
// const markup = require('./index.html');

const readInput = (argumentArray, expectedLength) => {
  if (argumentArray.length !== expectedLength) {
    throw new Error('Please provide one valid path to a CSV file');
  } else if (!fs.existsSync(argumentArray[2])) {
    throw new Error('The provided path does not exist');
  } else {
    return argumentArray[2];
  }
};

const app = express();
let data = [];
let xDataType;
try {
  let csvPath = readInput(process.argv, 3);
  data = parse(fs.readFileSync(csvPath, 'utf8'));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}


app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.send('<h1>hi</h1>');
});

const port = 4143;

app.listen(port, () => {
  console.log(
      '\x1b[32m%s\x1b[0m',
      `
      ┌─────────────────────────────┐
      │                             │
      │    Table on port ${port}       │
      │                             │
      └─────────────────────────────┘
      `,
    );
  import('open').then((module) => {
    module.default(`http://localhost:${port}`);
  });
});
