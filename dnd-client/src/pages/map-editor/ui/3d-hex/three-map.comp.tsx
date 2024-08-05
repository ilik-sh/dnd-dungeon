import React, { Suspense } from 'react';

import { calculateTilePosition } from 'pages/map-editor/libs/utils/calculateTilePosition';
import { selectMap } from 'pages/map-editor/model/store/map/map.selector';

import HexItemSkeleton from 'entities/room/ui/three-room-skeleton.comp';

import { useAppSelector } from 'shared/libs/hooks/redux.hooks';

import BlankCellObject from './blank-cell.comp';
import BorderHex from './border-hex.comp';
import { InteractiveThreeCell } from './interactive-three-cell.hoc';

type ThreeMapProps = {};

export default function ThreeMap({}: ThreeMapProps) {
  const map = useAppSelector(selectMap());

  return (
    <group>
      {map.map((item, column) =>
        item.map((cell, row) =>
          cell ? (
            <Suspense key={cell.id} fallback={<HexItemSkeleton position={calculateTilePosition(column, row, 1)} />}>
              <InteractiveThreeCell cell={cell} position={calculateTilePosition(column, row, 1)} />
            </Suspense>
          ) : (
            <BlankCellObject
              position={calculateTilePosition(column, row, 1)}
              coordinates={{ x: column, y: row }}
              key={column + row}
            />
          ),
        ),
      )}
      <BorderHex />
    </group>
  );
}
