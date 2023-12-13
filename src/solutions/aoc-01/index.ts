import { isInt32Array } from "util/types";
import { Logger } from "../../lib/logger";
import { parseFile, parseLine } from "../../lib/parser";
import { parse } from "path";

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
    this.lines.forEach((line) => {
      const { name } = parseLine(line, /(?<name>.+)/);
      const firstNumber = name.split("").find((char: string) => parseInt(char));
      const lastNumber = name
        .split("")
        .findLast((char: string) => parseInt(char));
      values += parseInt(firstNumber + lastNumber);

      // values[name] = 0
    });

    const result = values;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);
    const numberMap = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };

    let values = 0;
    this.lines.forEach((line) => {
      const { name } = parseLine(line, /(?<name>.+)/);

      const firstIndex = name
        .split("")
        .findIndex((char: string) => parseInt(char));
      const lastIndex = name
        .split("")
        .findLastIndex((char: string) => parseInt(char));
      let firstNumber = {
        index: firstIndex > -1 ? firstIndex : 99,
        value: name[firstIndex],
      };
      let lastNumber = { index: lastIndex, value: name[lastIndex] };
      const numbers = [];

      for (const [key, value] of Object.entries(numberMap)) {
        // numbers.push(
        //   ...line.matchAll(new RegExp(key, "g")),
        //   ...line.matchAll(new RegExp(value, "g"))
        // );

        const index = name.indexOf(key);
        const lastIndex = name.lastIndexOf(key);
        if (index > -1) {
          if (index < firstNumber.index) {
            firstNumber = { index, value };
          }
          if (lastIndex > lastNumber.index) {
            lastNumber = { index: lastIndex, value };
          }
        }
      }
      // numbers.sort((a, b) => a.index - b.index);
      values += parseInt(`${firstNumber.value}${lastNumber.value}`);

      // values += parseInt(
      //   `${
      //     numbers[0][0].length > 1
      //       ? numberMap[numbers[0][0]]
      //       : parseInt(numbers[0][0])
      //   }${
      //     numbers[numbers.length - 1][0].length > 1
      //       ? numberMap[numbers[numbers.length - 1][0]]
      //       : parseInt(numbers[numbers.length - 1][0])
      //   }`
      // );
    });
    const result = values;
    logger.result(result);
  }
}

const day = "01";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
// 55291
