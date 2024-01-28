import { Logger } from "../../lib/logger";
import { parseFile, parseLine } from "../../lib/parser";

class Resolver {
  day: string;
  file: string;
  lines: string[];

  constructor({ day, testing }: { day: string; testing: boolean }) {
    this.day = day;
    this.file = parseFile(day, testing ? "test" : "data");
    this.lines = this.file.split("\n");
  }
  solve(getSymmetry: (pattern: string[]) => number) {
    const logger = new Logger(`Day${this.day}-1`);
    const patterns = this.file.split("\n\n");
    let columns = 0;
    let rows = 0;
    for (const pattern of patterns) {
      const patternRows = pattern.split("\n");
      const rowsSymmetry = getSymmetry(patternRows);
      rows += rowsSymmetry;
      if (!rowsSymmetry) {
        const patternCols = patternRows[0]
          .split("")
          .map((_, colIndex) =>
            patternRows.map((row) => row[colIndex]).join("")
          );
        const colsSymmetry = getSymmetry(patternCols);
        columns += colsSymmetry;
      }
    }
    const result = rows * 100 + columns;
    logger.result(result);
  }
}

const day = "13";
const testing = false;

const getSymmetry = (pattern: string[]) => {
  let found = false;
  let i = 1;
  while (!found && i < pattern.length) {
    if (pattern[i - 1] === pattern[i]) {
      let symmetry = true;
      for (let j = 1; i - j >= 1 && i + j < pattern.length; j++) {
        if (pattern[i - j - 1] !== pattern[i + j]) {
          symmetry = false;
          break;
        }
      }
      if (symmetry) return i;
    }
    i++;
  }
  return 0;
};
const diffNumber = (pattern1: string, pattern2: string) => {
  let diff = 0;
  for (let i = 0; i < pattern1.length; i++) {
    if (pattern1[i] !== pattern2[i]) diff++;
  }
  return diff;
};
const getSymmetry2 = (pattern: string[]) => {
  let found = false;
  let i = 1;
  while (!found && i < pattern.length) {
    const diff = diffNumber(pattern[i - 1], pattern[i]);
    let fudgeFound = diff > 0;
    if (diff <= 1) {
      let symmetry = true;
      for (let j = 1; i - j >= 1 && i + j < pattern.length; j++) {
        if (pattern[i - j - 1] !== pattern[i + j]) {
          if (!fudgeFound) {
            if (diffNumber(pattern[i - j - 1], pattern[i + j]) === 1)
              fudgeFound = true;
          } else {
            symmetry = false;
            break;
          }
        }
      }
      if (symmetry && fudgeFound) return i;
    }
    i++;
  }
  return 0;
};
const resolver = new Resolver({ day, testing });
resolver.solve(getSymmetry);
resolver.solve(getSymmetry2);
