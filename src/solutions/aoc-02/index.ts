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
    const bag = {
      red: 12,
      green: 13,
      blue: 14,
    };
    let values = 0;
    this.lines.forEach((line) => {
      // const { name } = parseLine(line, /(?<name>.+)/);
      let possible = true;
      const game = line.split(":")[0];
      const gameId = line.substring(5, game.length);
      const draws = line.split(":")[1].split(";");
      draws.forEach((draw) => {
        const colors = draw.split(",");
        colors.forEach((colorDraw) => {
          const split = colorDraw.trim().split(" ");
          const number = split[0];
          const color = split[1];
          if (number > bag[color]) {
            possible = false;
          }
        });
      });
      if (possible) values += +gameId;
    });

    const result = values;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);
    let values = 0;
    this.lines.forEach((line) => {
      let minBag = {
        red: 0,
        green: 0,
        blue: 0,
      };
      const draws = line.split(":")[1].split(";");
      draws.forEach((draw) => {
        const colors = draw.split(",");
        colors.forEach((colorDraw) => {
          const split = colorDraw.trim().split(" ");
          const number = split[0];
          const color = split[1];
          if (+number > minBag[color]) {
            minBag[color] = +number;
          }
        });
      });
      values += minBag.red * minBag.green * minBag.blue;
    });

    const result = values;
    logger.result(result);
  }
}

const day = "02";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
