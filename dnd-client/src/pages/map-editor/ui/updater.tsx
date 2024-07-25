import React, { useEffect } from 'react';

import { dndApi } from 'app/api/dnd-api';
import { MapSnapshot } from 'entities/map/model/map-snapshot';
import { useAppDispatch } from 'shared/libs/hooks/redux.hooks';
import store from 'store';

type Props = {};

export default function Updater({}: Props) {
  const dispatch = useAppDispatch();
  let currentValue;

  const interval = setInterval(() => {
    let previousValue = currentValue;
    currentValue = store.getState().map;
    const mapSnapshot: MapSnapshot = {
      id: currentValue.id,
      name: currentValue.mapName,
      mapLayout: currentValue.map,
      mapInfo: currentValue.rooms,
    };

    if (previousValue !== currentValue) {
      dispatch(dndApi.endpoints.updateMap.initiate(mapSnapshot));
    }
  }, 6000);

  function stopInterval() {
    clearInterval(interval);
  }

  useEffect(() => {
    return () => {
      stopInterval();
    };
  });

  return <></>;
}
