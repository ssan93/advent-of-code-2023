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
    const values: Record<string, { left: string; right: string }> = {};
    const instructions = this.lines[0];

    this.lines.splice(2).forEach((line) => {
      const { element, left, right } = parseLine(
        line,
        /(?<element>.+) = \((?<left>.+), (?<right>.+)\)/
      );
      values[element] = { left, right };
    });
    let arrived = false;
    let steps = 0;
    let currentElement = values["AAA"];
    while (!arrived) {
      const direction =
        instructions[steps % instructions.length] === "L" ? "left" : "right";
      if (currentElement[direction] === "ZZZ") {
        arrived = true;
      }
      currentElement = values[currentElement[direction]];
      steps++;
    }
    const result = steps;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);

    const values: Record<string, { left: string; right: string }> = {};
    const instructions = this.lines[0];

    this.lines.splice(2).forEach((line) => {
      const { element, left, right } = parseLine(
        line,
        /(?<element>.+) = \((?<left>.+), (?<right>.+)\)/
      );
      values[element] = { left, right };
    });
    let steps = 0;
    let currentElements = Object.values(
      Object.entries(values).filter(([key]) => key[2] === "A")
    );
    const cycleLength = [];
    while (currentElements.length > 0) {
      const direction =
        instructions[steps % instructions.length] === "L" ? "left" : "right";
      if (currentElements.some(([key]) => key[2] === "Z")) {
        cycleLength.push(steps);
        currentElements = currentElements.filter(([key]) => key[2] !== "Z");
      }
      for (let i = 0; i < currentElements.length; i++) {
        currentElements[i] = [
          currentElements[i][1][direction],
          values[currentElements[i][1][direction]],
        ];
      }
      steps++;
    }
    function lcm(numbers: any[]) {
      function gcd(a: number, b: number) {
        if (b === 0) {
          return a;
        }
        return gcd(b, a % b);
      }

      return numbers.reduce((a: number, b: number) => (a * b) / gcd(a, b));
    }
    const result = lcm(cycleLength);
    logger.result(result);
  }
}

const day = "08";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
