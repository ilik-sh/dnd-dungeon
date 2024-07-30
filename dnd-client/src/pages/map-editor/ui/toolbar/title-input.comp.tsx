import React, { useState } from 'react';

import { InputBase, styled } from '@mui/material';
import { RootState } from 'store';

import { selectMapId } from 'pages/map-editor/model/store/map/map.selector';

import { useUpdateMapProfileMutation } from 'entities/map/api/update-map-profile.mutation';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { setMapName } from '../../model/store/map/map.slice';

const StyledInputBase = styled(InputBase)({
  input: {
    cursor: 'default',
  },
  fontWeight: '600',
});

export default function TitleInput() {
  const dispatch = useAppDispatch();

  const mapName = useAppSelector((state: RootState) => state.map.mapName);
  const mapId = useAppSelector(selectMapId());
  const [name, setName] = useState(mapName);
  const [updateMapProfile] = useUpdateMapProfileMutation();

  const handleBlur = (e) => {
    const name = e.target.value.replace(/\s+/g, ' ').trim();
    if (name.lenght === 0) {
      setName(mapName);
      return;
    }
    updateMapProfile({ id: mapId, name: name })
      .unwrap()
      .then(() => {
        dispatch(setMapName(name));
      });
    setName(name);
  };

  const handleEnterPressed = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    const name = e.target.value.replace(/\s+/g, ' ').trim();
    if (name.lenght === 0) {
      setName(mapName);
      return;
    }
    updateMapProfile({ id: mapId, name })
      .unwrap()
      .then(() => {
        dispatch(setMapName(name));
      });
    setName(name);
  };
  return (
    <StyledInputBase
      value={name}
      onChange={(e) => {
        setName(e.currentTarget.value);
      }}
      onFocus={(e) => e.target.select()}
      onBlur={handleBlur}
      onKeyDown={handleEnterPressed}
    />
  );
}
