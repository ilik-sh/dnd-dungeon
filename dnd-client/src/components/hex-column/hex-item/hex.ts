import { Directions } from 'enums/directions.enum';

export class Hex {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  get dimensions() {
    return {
      width: this.size * 2,
      height: this.size * Math.sqrt(3),
    };
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
      const angle = 60 * i;
      const pointX = this.center.x + this.size * Math.cos((Math.PI / 180) * angle);

      const pointY = this.center.y + this.size * Math.sin((Math.PI / 180) * angle);

      points.push(`${pointX} ${pointY}`);
    }
    return points;
  }

  get sideCenters() {
    const sideCenters = [];

    for (let i = 0; i < 6; i++) {
      const pointX = Math.round(this.center.x + this.size * Math.cos((Math.PI / 180) * (60 * i - 30)));
      const pointY = Math.round(this.center.y + this.size * Math.sin((Math.PI / 180) * (60 * i - 30)));
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

    lines['TOP_LEFT'] = [this.points[3], this.points[4]];

    lines['TOP'] = [this.points[4], this.points[5]];

    lines['TOP_RIGHT'] = [this.points[5], this.points[0]];
    lines['BOTTOM_LEFT'] = [this.points[2], this.points[3]];
    lines['BOTTOM'] = [this.points[1], this.points[2]];
    lines['BOTTOM_RIGHT'] = [this.points[0], this.points[1]];
    return lines;
  }
}
