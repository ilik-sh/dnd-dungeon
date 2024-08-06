import { KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';

import { useGetMapQuery } from 'entities/map';

import { useAppDispatch } from 'shared/libs/hooks/redux.hooks';
import CenteredCircularProgress from 'shared/ui/centered-hex-progress.comp';
import { VerticalContainer } from 'shared/ui/vertical-container.comp';

import { removeSelectedCell, setMap } from '../model/store/map/map.slice';
import MapCanvas from './3d-hex/map-canvas.comp';
import ComponentsPanel from './components-panel/components-panel.comp';
import PropertiesPanel from './properties-panel.comp';
import Toolbar from './toolbar/toolbar.comp';
import Updater from './updater';

export default function MapEditorPage() {
  const dispatch = useAppDispatch();

  const params = useParams();

  const { data, isLoading, isSuccess } = useGetMapQuery(params.id);

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (isSuccess) {
    dispatch(setMap(data));
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Delete') {
      dispatch(removeSelectedCell());
    }
  };

  console.log('Reload');

  return (
    <>
      <VerticalContainer
        tabIndex={0}
        onKeyDown={handleKeyDown}
        sx={{
          overflowY: 'hidden',
        }}
      >
        <Toolbar />
        <Updater />
        <MapCanvas />
        <ComponentsPanel />
        <PropertiesPanel />
      </VerticalContainer>
    </>
  );
}
