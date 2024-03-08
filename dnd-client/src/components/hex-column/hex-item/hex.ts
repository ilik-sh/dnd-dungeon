import { Directions } from "enums/directions.enum";

export class Hex {
  size: number;

  constructor(size: number) {
    this.size = size;
  }
  get center() {
    return {
      x: this.size,
      y: (Math.sqrt(3) / 2) * this.size,
    };
  }
  get points() {
    const points = [];

    for (let i = 0; i < 6; i++) {
      const pointX = Math.round(
        this.center.x + this.size * Math.cos((Math.PI / 180) * 60 * i)
      );
      const pointY = Math.round(
        this.center.y + this.size * Math.sin((Math.PI / 180) * 60 * i)
      );
      points.push(`${pointX} ${pointY}`);
    }
    return points;
  }
  get sideCenters() {
    const sideCenters = [];

    for (let i = 0; i < 6; i++) {
      const pointX = Math.round(
        this.center.x + this.size * Math.cos((Math.PI / 180) * (60 * i - 30))
      );
      const pointY = Math.round(
        this.center.y + this.size * Math.sin((Math.PI / 180) * (60 * i - 30))
      );
      sideCenters.push(`${pointX} ${pointY}`);
    }
    return sideCenters;
  }

  get lines() {
    let lines: Record<Directions, string[]> = {
      TOP_LEFT: [],
      TOP: [],
      BOTTOM: [],
      BOTTOM_RIGHT: [],
      BOTTOM_LEFT: [],
      TOP_RIGHT: [],
    };

    lines["TOP_LEFT"] = [
      `${this.center.x} ${this.center.y}`,
      this.sideCenters[4],
    ];
    lines["TOP"] = [`${this.center.x} ${this.center.y}`, this.sideCenters[5]];
    lines["TOP_RIGHT"] = [
      `${this.center.x} ${this.center.y}`,
      this.sideCenters[0],
    ];
    lines["BOTTOM_LEFT"] = [
      `${this.center.x} ${this.center.y}`,
      this.sideCenters[3],
    ];
    lines["BOTTOM"] = [
      `${this.center.x} ${this.center.y}`,
      this.sideCenters[2],
    ];
    lines["BOTTOM_RIGHT"] = [
      `${this.center.x} ${this.center.y}`,
      this.sideCenters[1],
    ];
    return lines;
  }
}
