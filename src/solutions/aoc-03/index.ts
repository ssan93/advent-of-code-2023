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
    const ignoreChar = "1234567890.";
    let values = 0;
    const map = this.lines;
    for (let i = 0; i < map.length; i++) {
      for (const number of map[i].matchAll(/\d+/g)) {
        let possible = false;
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= number[0].length; k++) {
            if (
              i + j >= 0 &&
              i + j < map.length &&
              number.index! + k >= 0 &&
              number.index! + k < map[i].length
            ) {
              if (!ignoreChar.includes(map[i + j][number.index! + k])) {
                possible = true;
              }
            }
          }
        }
        if (possible) values += +number[0];
      }
      // values[name] = 0
    }

    const result = values;
    // let results = 0;

    // for (let i = 0; i < map.length; i++) {
    //   const numbers = map[i].replace(/\./g, " ");
    //   for (const match of numbers.matchAll(/\d+/g)) {
    //     for (let j = match.index; j < match.index + match[0].length; j++) {
    //       const surrounding = [
    //         (map[i - 1] ?? "")[j - 1] ?? ".",
    //         (map[i - 1] ?? "")[j] ?? ".",
    //         (map[i - 1] ?? "")[j + 1] ?? ".",
    //         (map[i] ?? "")[j - 1] ?? ".",
    //         (map[i] ?? "")[j] ?? ".",
    //         (map[i] ?? "")[j + 1] ?? ".",
    //         (map[i + 1] ?? "")[j - 1] ?? ".",
    //         (map[i + 1] ?? "")[j] ?? ".",
    //         (map[i + 1] ?? "")[j + 1] ?? ".",
    //       ];
    //       if (surrounding.some((x) => /[^0-9.]/.test(x))) {
    //         results += parseInt(match[0]);
    //         break;
    //       }
    //     }
    //   }
    // }

    // console.log(results);
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);

    const gears: { [key: string]: string[] } = {};
    let values = 0;
    const map = this.lines;
    for (let i = 0; i < map.length; i++) {
      for (const number of map[i].matchAll(/\d+/g)) {
        let possible = false;
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= number[0].length; k++) {
            if (
              i + j >= 0 &&
              i + j < map.length &&
              number.index! + k >= 0 &&
              number.index! + k < map[i].length
            ) {
              if (map[i + j][number.index! + k] === "*") {
                const coordinate = `x:${number.index! + k},y:${i + j}`;
                const currentValue = gears[coordinate] || [];
                gears[coordinate] = [...currentValue, number[0]];
              }
            }
          }
        }
        if (possible) values += +number[0];
      }
    }
    for (const key in gears) {
      if (gears[key].length === 2) {
        values += +gears[key][0] * +gears[key][1];
      }
    }
    const result = values;
    logger.result(result);
  }
}

const day = "03";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
