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
    const linesTranspose = this.lines.map((_, colIndex) =>
      this.lines.map((row) => row[colIndex]).join("")
    );
    const linesSlideT = linesTranspose.map((line) =>
      line
        .split("#")
        .map((l) =>
          l
            .split("")
            .sort((a, b) => (b === "." ? -1 : 1))
            .join("")
        )
        .join("#")
    );

    const slid = linesSlideT.map((_, colIndex) =>
      linesSlideT.map((row) => row[colIndex])
    );
    const length = slid.length;
    for (let i = 0; i < length; i++) {
      const line = slid[i];
      values += line.filter((l) => l === "O").length * (length - i);
    }

    const result = values;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);
    let values = 0;
    const roll = (line: string[], direction: "left" | "right") => {
      return line.map((line) =>
        line
          .split("#")
          .map((l) =>
            l
              .split("")
              .sort((a, b) =>
                b === "."
                  ? direction === "left"
                    ? -1
                    : 1
                  : direction === "left"
                  ? 1
                  : -1
              )
              .join("")
          )
          .join("#")
      );
    };
    const transpose = (line: string[]) => {
      return line.map((_, colIndex) =>
        line.map((row) => row[colIndex]).join("")
      );
    };
    const cycle = (line: string[]) => {
      const rollNorth = transpose(roll(transpose(line), "left"));
      const rollWest = roll(rollNorth, "left");
      const rollSouth = transpose(roll(transpose(rollWest), "right"));
      const rollEast = roll(rollSouth, "right");
      return rollEast;
    };

    let slid = this.lines;
    const store = [];
    let cycleN = 0;
    let start = 0;
    for (let i = 0; i < 1000000000; i++) {
      slid = cycle(slid);
      if (store.filter((s) => s.join("") === slid.join("")).length > 0) {
        if (start === 0) start = i;
        else if (
          store.filter((s) => s.join("") === slid.join("")).length === 2
        ) {
          cycleN = i - start;
          break;
        }
      }
      store.push(slid);
    }

    const final = store[start - 1 + ((1000000000 - start) % cycleN)];
    const length = final.length;
    for (let i = 0; i < length; i++) {
      const line = final[i].split("");
      values += line.filter((l) => l === "O").length * (length - i);
    }

    const result = values;
    logger.result(result);
  }
}

const day = "14";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
