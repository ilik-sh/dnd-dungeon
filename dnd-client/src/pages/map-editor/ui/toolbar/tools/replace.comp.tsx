import { useState } from 'react';

import styled from '@emotion/styled';
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { selectRoomAmongMultipleSelectedCells, toggleMultipleSelection } from 'app/configuration/store/map.slice';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch } from 'shared/libs/hooks/redux.hooks';

const roomNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

const StyledDiv = styled('div')({
  display: 'flex',
});

export default function Replace() {
  const dispatch = useAppDispatch();

  const [room, setRoom] = useState('1');

  const handleClick = () => {
    dispatch(toggleMultipleSelection());
  };

  const handleChangeButtonClick = () => {
    try {
      dispatch(selectRoomAmongMultipleSelectedCells(+room));
    } catch (e) {
      enqueueSnackbar('Room with that number does not exist on one or more cells');
      dispatch(toggleMultipleSelection());
    }
  };

  const onChange = (e: SelectChangeEvent) => {
    setRoom(e.target.value);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        Cancel selection
      </Button>

      <StyledDiv>
        <Select id="newRoom" name="Room number" value={room} onChange={onChange}>
          {roomNumbers.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleChangeButtonClick}>Change</Button>
      </StyledDiv>
    </>
  );
}
