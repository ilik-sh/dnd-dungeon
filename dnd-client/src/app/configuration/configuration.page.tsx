import { VerticalContainer } from 'components/vertical-container.comp';
import DungeonConfigurator from './components/dungeon-configurator/dungeon-configurator.comp';
import { useEffect } from 'react';
import { useAppSelector } from 'hooks/redux.hooks';
import { RootState } from 'store';

export default function ConfigurationPage() {
  const mapName = useAppSelector((state: RootState) => state.map.mapName);

  useEffect(() => {
    document.title = mapName + ' - Dungeon';
  });

  return (
    <>
      <VerticalContainer>
        <DungeonConfigurator />
      </VerticalContainer>
    </>
  );
}
