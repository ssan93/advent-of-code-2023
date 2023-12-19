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
    const cardsByValue = [
      "A",
      "K",
      "Q",
      "J",
      "T",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
    ];
    const values: Record<string, { hand: string; bid: string }[]> = {
      highCard: [],
      pair: [],
      twoPairs: [],
      three: [],
      fullHouse: [],
      four: [],
      five: [],
    };
    this.lines.forEach((line) => {
      const { hand, bid } = parseLine(line, /(?<hand>.+) (?<bid>.+)/);
      const orderedHand = hand
        .split("")
        .sort(
          (a: string, b: string) =>
            cardsByValue.indexOf(a) - cardsByValue.indexOf(b)
        );
      let sameSuit = 1;
      const currentHand = [];
      for (let i = 1; i < orderedHand.length; i++) {
        if (orderedHand[i] === orderedHand[i - 1]) {
          sameSuit++;
        } else {
          currentHand.push(sameSuit);
          sameSuit = 1;
        }
      }
      currentHand.push(sameSuit);
      if (currentHand.includes(5)) values["five"].push({ hand, bid });
      else if (currentHand.includes(4)) values["four"].push({ hand, bid });
      else if (currentHand.includes(3) && currentHand.includes(2))
        values["fullHouse"].push({ hand, bid });
      else if (currentHand.includes(3)) values["three"].push({ hand, bid });
      else if (currentHand.includes(2) && currentHand.length === 3)
        values["twoPairs"].push({ hand, bid });
      else if (currentHand.includes(2)) values["pair"].push({ hand, bid });
      else values["highCard"].push({ hand, bid });
    });
    const orderedResults: string[] = [];
    Object.entries(values).forEach((type) => {
      type[1].sort((a, b) => {
        let i = 0;
        while (i < 5 && a.hand[i] === b.hand[i]) i++;
        return (
          cardsByValue.indexOf(b.hand[i]) - cardsByValue.indexOf(a.hand[i])
        );
      });
      orderedResults.push(...type[1].map((x) => x.bid));
    });
    const result = orderedResults.reduce((a, b, i) => a + +b * (i + 1), 0);
    logger.result(result);
  }

  solve2() {
    const logger = new Logger(`Day${this.day}-2`);

    const cardsByValue = [
      "A",
      "K",
      "Q",
      "T",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "J",
    ];
    const values: Record<string, { hand: string; bid: string }[]> = {
      highCard: [],
      pair: [],
      twoPairs: [],
      three: [],
      fullHouse: [],
      four: [],
      five: [],
    };
    this.lines.forEach((line) => {
      const { hand, bid } = parseLine(line, /(?<hand>.+) (?<bid>.+)/);
      const orderedHand = hand
        .split("")
        .sort(
          (a: string, b: string) =>
            cardsByValue.indexOf(a) - cardsByValue.indexOf(b)
        );
      let sameSuit = 1;
      let joker = 0;
      const currentHand = [];
      for (let i = 1; i < orderedHand.length; i++) {
        if (orderedHand[i] === "J") {
          joker++;
        } else if (orderedHand[i] === orderedHand[i - 1]) {
          sameSuit++;
        } else {
          currentHand.push(sameSuit);
          sameSuit = 1;
        }
      }
      currentHand.push(sameSuit);
      let orderedCurrentHand = currentHand.sort((a, b) => b - a);
      orderedCurrentHand[0] += joker;
      if (orderedCurrentHand.includes(5)) values["five"].push({ hand, bid });
      else if (orderedCurrentHand.includes(4))
        values["four"].push({ hand, bid });
      else if (orderedCurrentHand.includes(3) && orderedCurrentHand.includes(2))
        values["fullHouse"].push({ hand, bid });
      else if (orderedCurrentHand.includes(3))
        values["three"].push({ hand, bid });
      else if (
        orderedCurrentHand.includes(2) &&
        orderedCurrentHand.length === 3
      )
        values["twoPairs"].push({ hand, bid });
      else if (orderedCurrentHand.includes(2))
        values["pair"].push({ hand, bid });
      else values["highCard"].push({ hand, bid });
    });
    const orderedResults: string[] = [];
    Object.entries(values).forEach((type) => {
      type[1].sort((a, b) => {
        let i = 0;
        while (i < 5 && a.hand[i] === b.hand[i]) i++;
        return (
          cardsByValue.indexOf(b.hand[i]) - cardsByValue.indexOf(a.hand[i])
        );
      });
      orderedResults.push(...type[1].map((x) => x.bid));
    });
    const result = orderedResults.reduce((a, b, i) => a + +b * (i + 1), 0);
    logger.result(result);
  }
}

const day = "07";
const testing = false;

const resolver = new Resolver({ day, testing });
// resolver.solve1();
resolver.solve2();
