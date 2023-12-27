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
      const { springs, damaged } = parseLine(
        line,
        /(?<springs>.+) (?<damaged>.+)/
      );
      // const damagedSpringArrangement = damaged.split(",").map(Number);
      const regString = `^\\.*${damaged
        .split(",")
        .map((x: number, index: number) => {
          return `${index === 0 ? "" : "\\.+"}#{${x}}`;
        })
        .join("")}\\.*$`;
      let possibleArrangements = 0;
      const unknonmSprings = springs
        .split("")
        .filter((x: string) => x === "?").length;
      const states = [];

      const maxDecimal = parseInt("1".repeat(unknonmSprings), 2);
      for (var i = 0; i <= maxDecimal; i++) {
        states.push(i.toString(2).padStart(unknonmSprings, "0"));
      }
      for (const state of states) {
        let springsTest = springs;
        state.split("").forEach((x) => {
          springsTest = springsTest.replace("?", x === "0" ? "." : "#");
        });
        // console.log(springsTest);
        if (springsTest.match(regString)) {
          possibleArrangements++;
        }
      }

      // let damagedSpringLength = 0;
      // for (const spring of springs.split("")) {
      //   if (spring === "#") damagedSpringLength++;
      //   else if (spring === ".") damagedSpringLength = 0;
      //   else {

      //   }
      //   console.log(spring);
      // }
      // console.log(springs, damagedSpringArrangement);

      // values[name] = 0
      values += possibleArrangements;
    });

    const result = values;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);

    const result = 0;
    logger.result(result);
  }
}

const day = "12";
const testing = false;

const resolver = new Resolver({ day, testing });
resolver.solve1();
// resolver.solve2()
