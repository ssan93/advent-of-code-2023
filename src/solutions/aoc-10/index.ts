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
    const lines = this.lines;
    let y = lines.findIndex((x) => x.includes("S"));
    let x = lines[y].indexOf("S");
    const eligiblePositions = {
      right: ["-", "J", "7"],
      left: ["-", "L", "F"],
      up: ["|", "7", "F"],
      down: ["|", "J", "L"],
    };
    let done = false;
    const surrounding = {
      right: lines[y][x + 1],
      left: lines[y][x - 1],
      up: lines[y - 1][x],
      down: lines[y + 1][x],
    };
    let commingFrom = "";
    if (eligiblePositions.right.includes(surrounding.right)) {
      x++;
      commingFrom = "left";
    } else if (eligiblePositions.left.includes(surrounding.left)) {
      x--;
      commingFrom = "right";
    } else if (eligiblePositions.up.includes(surrounding.up)) {
      y--;
      commingFrom = "down";
    } else if (eligiblePositions.down.includes(surrounding.down)) {
      y++;
      commingFrom = "up";
    }
    let length = 0;
    while (!done) {
      const currentPipe = lines[y][x];
      switch (currentPipe) {
        case "-":
          if (commingFrom === "left") {
            x++;
          } else {
            x--;
          }
          break;
        case "|":
          if (commingFrom === "up") {
            y++;
          } else {
            y--;
          }
          break;
        case "J":
          if (commingFrom === "left") {
            y--;
            commingFrom = "down";
          } else {
            x--;
            commingFrom = "right";
          }
          break;
        case "L":
          if (commingFrom === "right") {
            y--;
            commingFrom = "down";
          } else {
            x++;
            commingFrom = "left";
          }
          break;
        case "F":
          if (commingFrom === "down") {
            x++;
            commingFrom = "left";
          } else {
            y++;
            commingFrom = "up";
          }
          break;
        case "7":
          if (commingFrom === "down") {
            x--;
            commingFrom = "right";
          } else {
            y++;
            commingFrom = "up";
          }
          break;
        case "S":
          done = true;
          break;
      }
      length++;
    }
    const result = length / 2;
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);
    const lines = this.lines;
    const mainLoop = [];
    let y = lines.findIndex((x) => x.includes("S"));
    let x = lines[y].indexOf("S");
    const beginCoordinates = { x, y };
    const eligiblePositions = {
      right: ["-", "J", "7"],
      left: ["-", "L", "F"],
      up: ["|", "7", "F"],
      down: ["|", "J", "L"],
    };
    let done = false;
    const surrounding = {
      right: x + 1 < lines[y].length ? lines[y][x + 1] : "",
      left: x - 1 >= 0 ? lines[y][x - 1] : "",
      up: y - 1 >= 0 ? lines[y - 1][x] : "",
      down: y + 1 < lines.length ? lines[y + 1][x] : "",
    };
    let commingFrom = "";
    let begin = false;
    let replace = "";
    if (eligiblePositions.right.includes(surrounding.right)) {
      x++;
      commingFrom = "left";
      begin = true;
      replace += "R";
    } else if (eligiblePositions.left.includes(surrounding.left)) {
      if (!begin) {
        x--;
        commingFrom = "right";
      }
      replace += "L";
    } else if (eligiblePositions.up.includes(surrounding.up)) {
      if (!begin) {
        y--;
        commingFrom = "down";
      }
      replace += "U";
    } else if (eligiblePositions.down.includes(surrounding.down)) {
      if (!begin) {
        y++;
        commingFrom = "up";
      }
      replace += "D";
    }
    const replaceBy = replace.includes("R")
      ? replace.includes("L")
        ? "-"
        : replace.includes("U")
        ? "L"
        : "F"
      : replace.includes("L")
      ? replace.includes("U")
        ? "J"
        : "7"
      : "|";
    while (!done) {
      mainLoop.push({ x: y, y: x });
      const currentPipe = lines[y][x];
      switch (currentPipe) {
        case "-":
          if (commingFrom === "left") {
            x++;
          } else {
            x--;
          }
          break;
        case "|":
          if (commingFrom === "up") {
            y++;
          } else {
            y--;
          }
          break;
        case "J":
          if (commingFrom === "left") {
            y--;
            commingFrom = "down";
          } else {
            x--;
            commingFrom = "right";
          }
          break;
        case "L":
          if (commingFrom === "right") {
            y--;
            commingFrom = "down";
          } else {
            x++;
            commingFrom = "left";
          }
          break;
        case "F":
          if (commingFrom === "down") {
            x++;
            commingFrom = "left";
          } else {
            y++;
            commingFrom = "up";
          }
          break;
        case "7":
          if (commingFrom === "down") {
            x--;
            commingFrom = "right";
          } else {
            y++;
            commingFrom = "up";
          }
          break;
        case "S":
          done = true;
          break;
      }
    }
    lines[beginCoordinates.y] = lines[beginCoordinates.y].replace(
      "S",
      replaceBy
    );
    let values = 0;
    for (let i = 0; i < lines.length; i++) {
      let insideLoop = false;
      let previousCorner = "";
      for (let j = 0; j < lines[i].length; j++) {
        const current = lines[i][j];
        if (
          (current === "|" ||
            (current === "J" && previousCorner === "F") ||
            (current === "7" && previousCorner === "L")) &&
          mainLoop.some((x) => x.x === i && x.y === j)
        ) {
          insideLoop = !insideLoop;
        }
        if (insideLoop && !mainLoop.some((x) => x.x === i && x.y === j)) {
          values++;
        }
        if (["L", "7", "J", "F"].includes(current)) {
          previousCorner = current;
        }
      }
    }
    const result = values;
    logger.result(result);
  }
}

const day = "10";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
