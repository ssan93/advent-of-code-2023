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
    this.lines.forEach((line) => {
      const value = line.match(/-*\d+/g)?.map(Number)!;
      const sequences = [value];
      let done = false;
      let i = 0;
      while (!done) {
        const sequence = [];
        for (let j = 1; j < sequences[i].length; j++) {
          sequence.push(sequences[i][j] - sequences[i][j - 1]);
        }
        sequences.push(sequence);
        done = sequences[sequences.length - 1].every((y) => y === 0);
        i++;
      }
      let extrapolate = 0;
      for (let j = sequences.length - 2; j >= 0; j--) {
        extrapolate = sequences[j][sequences[j].length - 1] + extrapolate;
      }
      values += extrapolate;
    });

    const result = values;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);

    let values = 0;
    this.lines.forEach((line) => {
      const value = line.match(/-*\d+/g)?.map(Number)!;
      const sequences = [value];
      let done = false;
      let i = 0;
      while (!done) {
        const sequence = [];
        for (let j = 1; j < sequences[i].length; j++) {
          sequence.push(sequences[i][j] - sequences[i][j - 1]);
        }
        sequences.push(sequence);
        done = sequences[sequences.length - 1].every((y) => y === 0);
        i++;
      }
      let extrapolate = 0;
      for (let j = sequences.length - 2; j >= 0; j--) {
        extrapolate = sequences[j][0] - extrapolate;
      }
      values += extrapolate;
    });

    const result = values;
    logger.result(result);
  }
}

const day = "09";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
