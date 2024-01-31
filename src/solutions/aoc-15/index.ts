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

  hash(string: string) {
    let hash = 0;
    for (const c of string) {
      hash = ((hash + c.charCodeAt(0)) * 17) % 256;
    }
    return hash;
  }
  solve1() {
    const logger = new Logger(`Day${this.day}-1`);
    let values = 0;
    const sequence = this.file.split("\n").join(",");
    for (const step of sequence.split(",")) {
      values += this.hash(step);
    }

    const result = values;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);
    let values = 0;
    const boxes: Record<number, { label: string; focalLength: number }[]> = {};
    const sequence = this.file.split("\n").join(",");
    for (const step of sequence.split(",")) {
      const { label, operation, focalLength } = parseLine(
        step,
        /(?<label>.+)(?<operation>(=|-)+)(?<focalLength>.*)/
      );
      const boxHash = this.hash(label);
      if (!boxes[boxHash]) boxes[boxHash] = [];
      if (operation === "=") {
        if (boxes[boxHash].find((v) => v.label === label)) {
          boxes[boxHash].map((v) =>
            v.label === label ? (v.focalLength = focalLength) : v
          );
        } else boxes[boxHash].push({ label, focalLength });
      } else {
        boxes[boxHash] = boxes[boxHash].filter((v) => v.label !== label);
      }
    }
    for (const box in boxes) {
      for (let i = 0; i < boxes[box].length; i++) {
        values += (+box + 1) * (i + 1) * boxes[box][i].focalLength;
      }
    }

    const result = values;
    logger.result(result);
  }
}

const day = "15";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
