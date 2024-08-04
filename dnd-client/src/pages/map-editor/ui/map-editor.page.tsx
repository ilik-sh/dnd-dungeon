import { KeyboardEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { RootState } from 'store';

import { useGetMapQuery } from 'entities/map';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import CenteredCircularProgress from 'shared/ui/centered-hex-progress.comp';
import { VerticalContainer } from 'shared/ui/vertical-container.comp';

import { getSelectedCell } from '../model/store/map/map.selector';
import { removeCell, removeSelectedCell, setMap } from '../model/store/map/map.slice';
import ThreeHex from './3d-hex/3d-hex.comp';
import ComponentsPanel from './components-panel/components-panel.comp';
import PropertiesPanel from './properties-panel.comp';
import Toolbar from './toolbar/toolbar.comp';
import Updater from './updater';

export default function MapEditorPage() {
  const dispatch = useAppDispatch();
  const mapName = useAppSelector((state: RootState) => state.map.mapName);

  const params = useParams();

  const { data, isLoading } = useGetMapQuery(params.id);

  useEffect(() => {
    document.title = mapName + ' - Dungeon';
  });

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    dispatch(setMap(data));
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Delete') {
      dispatch(removeSelectedCell());
    }
  };
  console.log('Rerender');
  return (
    <>
      <VerticalContainer tabIndex={0} onKeyDown={handleKeyDown}>
        <Toolbar />
        <Updater />
        <ThreeHex />
        <ComponentsPanel />
        <PropertiesPanel />
      </VerticalContainer>
    </>
  );
}
