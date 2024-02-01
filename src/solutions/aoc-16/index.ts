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
    const values: Record<string, boolean> = {};
    const cache: Record<string, boolean> = {};
    const map = this.file.split("\n").map((line) => line.split(""));
    const comeFrom: Record<string, Record<string, string>> = {
      0: {
        1: "left",
        "-1": "right",
      },
      1: {
        0: "up",
      },
      "-1": {
        0: "down",
      },
    };
    const moves: Record<string, Record<string, { i: number; j: number }>> = {
      up: {
        "|": { i: 1, j: 0 },
        ".": { i: 1, j: 0 },
        "\\": { i: 0, j: 1 },
        "/": { i: 0, j: -1 },
      },
      down: {
        "|": { i: -1, j: 0 },
        ".": { i: -1, j: 0 },
        "\\": { i: 0, j: -1 },
        "/": { i: 0, j: 1 },
      },
      left: {
        "-": { i: 0, j: 1 },
        ".": { i: 0, j: 1 },
        "\\": { i: 1, j: 0 },
        "/": { i: -1, j: 0 },
      },
      right: {
        "-": { i: 0, j: -1 },
        ".": { i: 0, j: -1 },
        "\\": { i: -1, j: 0 },
        "/": { i: 1, j: 0 },
      },
    };

    const beamRoute = (i: number, j: number, from: string) => {
      while (i >= 0 && i < map.length && j >= 0 && j < map[0].length) {
        values[`${i},${j}`] = true;
        if (cache[`${i},${j},${from}`]) return 0;
        cache[`${i},${j},${from}`] = true;
        const currentTile = map[i][j];
        if (from === "left" || from === "right") {
          if (currentTile === "|") {
            beamRoute(i - 1, j, "down");
            beamRoute(i + 1, j, "up");
          }
        }
        if (from === "up" || from === "down") {
          if (currentTile === "-") {
            beamRoute(i, j - 1, "right");
            beamRoute(i, j + 1, "left");
          }
        }
        const nextMove = moves[from][currentTile];
        if (!nextMove) return 0;
        i += nextMove.i;
        j += nextMove.j;
        from = comeFrom[nextMove.i][nextMove.j];
      }
    };
    beamRoute(0, 0, "left");

    const result = Object.keys(values).length;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);
    let values: Record<string, boolean> = {};
    let cache: Record<string, boolean> = {};
    const map = this.file.split("\n").map((line) => line.split(""));
    const comeFrom: Record<string, Record<string, string>> = {
      0: {
        1: "left",
        "-1": "right",
      },
      1: {
        0: "up",
      },
      "-1": {
        0: "down",
      },
    };
    const moves: Record<string, Record<string, { i: number; j: number }>> = {
      up: {
        "|": { i: 1, j: 0 },
        ".": { i: 1, j: 0 },
        "\\": { i: 0, j: 1 },
        "/": { i: 0, j: -1 },
      },
      down: {
        "|": { i: -1, j: 0 },
        ".": { i: -1, j: 0 },
        "\\": { i: 0, j: -1 },
        "/": { i: 0, j: 1 },
      },
      left: {
        "-": { i: 0, j: 1 },
        ".": { i: 0, j: 1 },
        "\\": { i: 1, j: 0 },
        "/": { i: -1, j: 0 },
      },
      right: {
        "-": { i: 0, j: -1 },
        ".": { i: 0, j: -1 },
        "\\": { i: -1, j: 0 },
        "/": { i: 1, j: 0 },
      },
    };

    const beamRoute = (i: number, j: number, from: string) => {
      while (i >= 0 && i < map.length && j >= 0 && j < map[0].length) {
        values[`${i},${j}`] = true;
        if (cache[`${i},${j},${from}`]) return 0;
        cache[`${i},${j},${from}`] = true;
        const currentTile = map[i][j];
        if (from === "left" || from === "right") {
          if (currentTile === "|") {
            beamRoute(i - 1, j, "down");
            beamRoute(i + 1, j, "up");
          }
        }
        if (from === "up" || from === "down") {
          if (currentTile === "-") {
            beamRoute(i, j - 1, "right");
            beamRoute(i, j + 1, "left");
          }
        }
        const nextMove = moves[from][currentTile];
        if (!nextMove) return 0;
        i += nextMove.i;
        j += nextMove.j;
        from = comeFrom[nextMove.i][nextMove.j];
      }
    };
    const calculateBeam = (i: number, j: number, from: string) => {
      values = {};
      cache = {};
      beamRoute(i, j, from);
      return Object.keys(values).length;
    };

    let maxBeam = 0;
    for (let j = 0; j < map[0].length; j++) {
      const beam = calculateBeam(0, j, "up");
      if (beam > maxBeam) maxBeam = beam;
      const beam2 = calculateBeam(map.length - 1, j, "down");
      if (beam2 > maxBeam) maxBeam = beam2;
    }
    for (let i = 0; i < map.length; i++) {
      const beam = calculateBeam(i, 0, "left");
      if (beam > maxBeam) maxBeam = beam;
      const beam2 = calculateBeam(i, map[0].length - 1, "right");
      if (beam2 > maxBeam) maxBeam = beam2;
    }

    const result = maxBeam;
    logger.result(result);
  }
}

const day = "16";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
