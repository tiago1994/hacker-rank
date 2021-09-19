"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'arrayManipulation' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */
function arrayManipulation(n, queries) {
  let max = 0;
  const params = [];

  for (let q = 0; q < queries.length; q++) {
    const query = queries[q];
    const qstart = query[0];
    const qend = query[1];
    const qval = query[2];

    params.push({
      key: qstart,
      val: qval,
    });

    params.push({
      key: qend,
      val: -qval,
    });
  }

  //sort the parameters by key
  params.sort((item1, item2) => {
    if (item1.key === item2.key) {
      return item2.val - item1.val;
    }

    return item1.key - item2.key;
  });

  let sum = 0;

  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    sum += param.val;

    if (sum > max) {
      max = sum;
    }
  }

  return max;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  let queries = Array(m);

  for (let i = 0; i < m; i++) {
    queries[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((queriesTemp) => parseInt(queriesTemp, 10));
  }

  const result = arrayManipulation(n, queries);

  ws.write(result + "\n");

  ws.end();
}
