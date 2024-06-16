export enum Directions {
  TOP_LEFT = 'TOP_LEFT',
  TOP = 'TOP',
  TOP_RIGHT = 'BOTTOM',
  BOTTOM_LEFT = 'TOP_RIGHT',
  BOTTOM = 'BOTTOM_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
}

export type Direction = keyof typeof Directions;
