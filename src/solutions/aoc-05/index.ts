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
    const values: Record<string, Record<number, Record<string, number>>> = {};
    const seeds = this.lines[0].split(": ")[1].split(" ");
    const split = this.file.split("\n\n");
    for (let i = 1; i < split.length; i++) {
      const mapperLine = split[i].split("\n");
      const mapName = mapperLine[0].split(" map")[0];
      values[mapName] = {};
      for (let j = 1; j < mapperLine.length; j++) {
        values[mapName][j - 1] = {};
        const { destination, source, range } = parseLine(
          mapperLine[j],
          /(?<destination>.+) (?<source>.+) (?<range>.+)/
        );
        values[mapName][j - 1]["start"] = +source;
        values[mapName][j - 1]["end"] = +source + +range - 1;
        values[mapName][j - 1]["map"] = +destination - +source;
      }
    }
    const getMapResult = (mapName: string, value: number) => {
      for (const map of Object.values(values[mapName])) {
        if (value >= map.start && value <= map.end) {
          return value + map.map;
        }
      }
      return value;
    };

    const locations = [];
    for (const seed of seeds) {
      const soil = getMapResult("seed-to-soil", +seed);
      const fertilizer = getMapResult("soil-to-fertilizer", soil);
      const water = getMapResult("fertilizer-to-water", fertilizer);
      const light = getMapResult("water-to-light", water);
      const temperature = getMapResult("light-to-temperature", light);
      const humidity = getMapResult("temperature-to-humidity", temperature);
      const location = getMapResult("humidity-to-location", humidity);
      locations.push(location);
    }

    const result = locations.sort((a, b) => a - b)[0];
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);
    const values: Record<string, Record<number, Record<string, number>>> = {};
    const seeds = this.lines[0].split(": ")[1].split(" ");
    const split = this.file.split("\n\n");
    for (let i = 1; i < split.length; i++) {
      const mapperLine = split[i].split("\n");
      const mapName = mapperLine[0].split(" map")[0];
      values[mapName] = {};
      for (let j = 1; j < mapperLine.length; j++) {
        values[mapName][j - 1] = {};
        const { destination, source, range } = parseLine(
          mapperLine[j],
          /(?<destination>.+) (?<source>.+) (?<range>.+)/
        );
        values[mapName][j - 1]["start"] = +source;
        values[mapName][j - 1]["end"] = +source + +range - 1;
        values[mapName][j - 1]["map"] = +destination - +source;
      }
    }
    const getMapResult = (mapName: string, value: number) => {
      for (const map of Object.values(values[mapName])) {
        if (value >= map.start && value <= map.end) {
          return value + map.map;
        }
      }
      return value;
    };

    let minLocation = Infinity;
    for (let i = 0; i < seeds.length; i += 2) {
      for (let j = 0; j < +seeds[i + 1]; j++) {
        const soil = getMapResult("seed-to-soil", +seeds[i] + j);
        const fertilizer = getMapResult("soil-to-fertilizer", soil);
        const water = getMapResult("fertilizer-to-water", fertilizer);
        const light = getMapResult("water-to-light", water);
        const temperature = getMapResult("light-to-temperature", light);
        const humidity = getMapResult("temperature-to-humidity", temperature);
        const location = getMapResult("humidity-to-location", humidity);
        if (minLocation > location) {
          minLocation = location;
        }
      }
    }

    const result = minLocation;
    logger.result(result);
    //4283162641
  }
}

const day = "05";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
