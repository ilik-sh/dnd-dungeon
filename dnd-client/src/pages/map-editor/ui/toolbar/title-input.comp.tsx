import React, { useState } from 'react';

import { InputBase, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import { RootState } from 'store';

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
  const [name, setName] = useState(mapName);

  const handleBlur = (e) => {
    const name = e.target.value.replace(/\s+/g, ' ').trim();
    if (name.lenght === 0) {
      setName(mapName);
      return;
    }

    dispatch(setMapName(name));
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

    dispatch(setMapName(name));
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
