import { StaticRoomDto } from "./types/static-room.dto";

export const mockData: (StaticRoomDto | null)[][] = [
  [
    {
      id: 0,
      level: 5,
      roomType: "PEACE",
      roomDirections: {
        BOTTOM: false,
        TOP: false,
        TOP_LEFT: true,
        BOTTOM_RIGHT: true,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    {
      id: 0,
      level: 2,
      roomType: "EVIL",
      roomDirections: {
        BOTTOM: false,
        TOP: false,
        TOP_LEFT: true,
        BOTTOM_RIGHT: true,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    {
      id: 0,
      level: 1,
      roomType: "NEUTRAL",
      roomDirections: {
        BOTTOM: false,
        TOP: false,
        TOP_LEFT: true,
        BOTTOM_RIGHT: true,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    {
      id: 0,
      level: 1,
      roomType: "LOOT",
      roomDirections: {
        BOTTOM: false,
        TOP: false,
        TOP_LEFT: true,
        BOTTOM_RIGHT: true,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    {
      id: 0,
      level: 3,
      roomType: "NEUTRAL",
      roomDirections: {
        BOTTOM: false,
        TOP: false,
        TOP_LEFT: true,
        BOTTOM_RIGHT: true,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    {
      id: 0,
      level: 1,
      roomType: "PEACE",
      roomDirections: {
        BOTTOM: false,
        TOP: false,
        TOP_LEFT: true,
        BOTTOM_RIGHT: true,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    null,
    null,
    null,
    null,
  ],
  [
    {
      id: 0,
      level: 2,
      roomType: "PEACE",
      roomDirections: {
        BOTTOM: true,
        TOP: true,
        TOP_LEFT: false,
        BOTTOM_RIGHT: false,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    {
      id: 0,
      level: 1,
      roomType: "LOOT",
      roomDirections: {
        BOTTOM: true,
        TOP: true,
        TOP_LEFT: false,
        BOTTOM_RIGHT: false,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    {
      id: 0,
      level: 1,
      roomType: "EVIL",
      roomDirections: {
        BOTTOM: true,
        TOP: true,
        TOP_LEFT: false,
        BOTTOM_RIGHT: false,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    {
      id: 0,
      level: 3,
      roomType: "NEUTRAL",
      roomDirections: {
        BOTTOM: true,
        TOP: true,
        TOP_LEFT: true,
        BOTTOM_RIGHT: true,
        TOP_RIGHT: true,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    {
      id: 0,
      level: 4,
      roomType: "LOOT",
      roomDirections: {
        BOTTOM: true,
        TOP: true,
        TOP_LEFT: false,
        BOTTOM_RIGHT: false,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    {
      id: 0,
      level: 4,
      roomType: "NEUTRAL",
      roomDirections: {
        BOTTOM: true,
        TOP: true,
        TOP_LEFT: false,
        BOTTOM_RIGHT: false,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
    {
      id: 0,
      level: 3,
      roomType: "QUEST",
      roomDirections: {
        BOTTOM: true,
        TOP: true,
        TOP_LEFT: false,
        BOTTOM_RIGHT: false,
        TOP_RIGHT: false,
        BOTTOM_LEFT: false,
      },
      visited: false,
    },
  ],
];
