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
    const values = [];
    const times = this.lines[0].match(/\d+/g)!;
    const distances = this.lines[1].match(/\d+/g)!;
    for (let i = 0; i < times.length; i++) {
      const time = +times[i];
      const currentBest = +distances[i];
      let minHoldTimeToWin = Infinity;
      let maxHoldTimeToWin = 0;
      let holdTime = 1;
      while (minHoldTimeToWin === Infinity || maxHoldTimeToWin === 0) {
        if (minHoldTimeToWin === Infinity) {
          const runningTimeInf = holdTime;
          const runningDistanceInf = runningTimeInf * (time - holdTime);
          if (runningDistanceInf > currentBest) {
            minHoldTimeToWin = runningTimeInf;
          }
        }
        if (maxHoldTimeToWin === 0) {
          const runningTimeSup = time - holdTime;
          const runningDistanceSup = runningTimeSup * holdTime;
          if (runningDistanceSup > currentBest) {
            maxHoldTimeToWin = runningTimeSup;
          }
        }
        holdTime++;
      }
      values[i] = maxHoldTimeToWin - minHoldTimeToWin + 1;
    }

    const result = values.reduce((a, b) => a * b, 1);
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);

    let values = 0;
    const times = this.lines[0].match(/\d+/g)!.join("");
    const distances = this.lines[1].match(/\d+/g)!.join("");
    const time = +times;
    const currentBest = +distances;
    let minHoldTimeToWin = Infinity;
    let maxHoldTimeToWin = 0;
    let holdTime = 1;
    while (minHoldTimeToWin === Infinity || maxHoldTimeToWin === 0) {
      if (minHoldTimeToWin === Infinity) {
        const runningTimeInf = holdTime;
        const runningDistanceInf = runningTimeInf * (time - holdTime);
        if (runningDistanceInf > currentBest) {
          minHoldTimeToWin = runningTimeInf;
        }
      }
      if (maxHoldTimeToWin === 0) {
        const runningTimeSup = time - holdTime;
        const runningDistanceSup = runningTimeSup * holdTime;
        if (runningDistanceSup > currentBest) {
          maxHoldTimeToWin = runningTimeSup;
        }
      }
      holdTime++;
    }
    values = maxHoldTimeToWin - minHoldTimeToWin + 1;

    const result = values;
    logger.result(result);
  }
}

const day = "06";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
