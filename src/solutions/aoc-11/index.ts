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

  solve1() {
    const logger = new Logger(`Day${this.day}-1`);
    let values = 0;
    const expendYIndexes: number[] = [];
    const galaxies = [];
    for (let i = 0; i < this.lines.length; i++) {
      let hasGalaxy = false;
      for (let j = 0; j < this.lines[i].length; j++) {
        if (this.lines[j][i] === "#") {
          hasGalaxy = true;
        }
      }
      if (!hasGalaxy) expendYIndexes.push(i);
    }
    const expendedUniverse = this.lines
      .map((x) => {
        let addLines = 0;
        for (const index of expendYIndexes) {
          x = x.slice(0, index + addLines) + "." + x.slice(index + addLines);
          addLines++;
        }
        return x.includes("#") ? x : [x, x];
      })
      .flat();
    // const expendedUniverse = [];
    // for (let i = 0; i < this.lines.length; i++) {
    //   let addLines = 0;
    //   let line = this.lines[i];
    //   for (const index of expendYIndexes) {
    //     line =
    //       line.slice(0, index + addLines) + "." + line.slice(index + addLines);
    //     addLines++;
    //   }
    //   if (this.lines[i].includes("#")) {
    //     expendedUniverse.push(line);
    //   } else {
    //     expendedUniverse.push(line);
    //     expendedUniverse.push(line);
    //   }
    // }
    for (let i = 0; i < expendedUniverse.length; i++) {
      for (let j = 0; j < expendedUniverse[i].length; j++) {
        if (expendedUniverse[i][j] === "#") {
          galaxies.push({ i, j });
        }
      }
    }
    for (let i = 0; i < galaxies.length; i++) {
      for (let j = i + 1; j < galaxies.length; j++) {
        values +=
          Math.abs(galaxies[i].i - galaxies[j].i) +
          Math.abs(galaxies[i].j - galaxies[j].j);
      }
    }
    const result = values;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);
    const expandRatio = 1000000;
    let values = 0;
    const expendYIndexes: number[] = [];
    const galaxies: { i: number; j: number }[] = [];
    let addLines = 0;
    for (let i = 0; i < this.lines.length; i++) {
      let hasGalaxy = false;
      for (let j = 0; j < this.lines[i].length; j++) {
        if (this.lines[j][i] === "#") {
          hasGalaxy = true;
          galaxies.push({ i: j, j: i + addLines });
        }
      }
      if (!hasGalaxy) {
        expendYIndexes.push(i);
        addLines += expandRatio - 1;
      }
    }
    const addColumns: number[] = [];
    this.lines.forEach((x, index) => {
      let addLines = 0;
      for (const index of expendYIndexes) {
        x =
          x.slice(0, index + addLines) +
          ".".repeat(expandRatio - 1) +
          x.slice(index + addLines);
        addLines += expandRatio - 1;
      }
      if (!x.includes("#")) addColumns.push(index);
      return x.includes("#") ? x : Array(expandRatio).fill(x);
    });
    for (let i = 0; i < galaxies.length; i++) {
      galaxies[i].i +=
        addColumns.filter((x) => x < galaxies[i].i).length * (expandRatio - 1);
    }
    for (let i = 0; i < galaxies.length; i++) {
      for (let j = i + 1; j < galaxies.length; j++) {
        values +=
          Math.abs(galaxies[i].i - galaxies[j].i) +
          Math.abs(galaxies[i].j - galaxies[j].j);
      }
    }
    const result = values;
    logger.result(result);
  }
}

const day = "11";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
