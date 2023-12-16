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
      let { cardId, winningNumbers, drawNumbers } = parseLine(
        line,
        /Card (?<cardId>.+): (?<winningNumbers>.+) \| (?<drawNumbers>.+)/
      );
      winningNumbers = winningNumbers.replace(/ +/g, " ").trim().split(" ");
      drawNumbers = drawNumbers.replace(/ +/g, " ").trim().split(" ");
      let points = 0;
      for (const draw of drawNumbers) {
        if (winningNumbers.includes(draw)) {
          points = points === 0 ? 1 : points * 2;
        }
      }
      values += points;
    });

    const result = values;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);
    let values = Array(this.lines.length).fill(1);

    this.lines.forEach((line) => {
      let { cardId, winningNumbers, drawNumbers } = parseLine(
        line,
        /Card (?<cardId>.+): (?<winningNumbers>.+) \| (?<drawNumbers>.+)/
      );
      winningNumbers = winningNumbers.replace(/ +/g, " ").trim().split(" ");
      drawNumbers = drawNumbers.replace(/ +/g, " ").trim().split(" ");
      cardId = +cardId.trim();
      let win = 0;
      for (const draw of drawNumbers) {
        if (winningNumbers.includes(draw)) {
          win++;
        }
      }
      for (let i = 0; i < win; i++) {
        values[i + cardId] += values[cardId - 1];
      }
    });
    const result = values.reduce((a, b) => a + b, 0);
    logger.result(result);
  }
}

const day = "04";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
