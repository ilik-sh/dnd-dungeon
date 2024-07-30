import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Check } from '@mui/icons-material';
import { Box, IconButton, styled, Typography } from '@mui/material';

import { roomFormSchema, RoomFormYup } from 'pages/map-editor/model/validation-schemas/room-form.schema';

import { RoomDto } from 'entities/room/model/types/room.dto';

import { RoomType } from 'shared/libs/enums/room-type.enum';
import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { getSelectedCell } from '../../model/store/map/map.selector';
import { updateRoom } from '../../model/store/map/map.slice';
import RoomForm from './room-properties.form';

type RoomPropertiesProps = {
  room: RoomDto;
  onRoomSelectButtonClicked: (room: RoomDto) => void;
};

const StyledWrapper = styled(Box)({
  paddingTop: '10px',
});

const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'center',
  alignItems: 'center',
});

const RoundIconButton = styled(IconButton)({
  borderRadius: '0',
});

const ButtonContainer = styled(Box)({});

export default function RoomProperties({ room, onRoomSelectButtonClicked }: RoomPropertiesProps) {
  const dispatch = useAppDispatch();
  const selectedCell = useAppSelector(getSelectedCell());

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RoomFormYup>({
    resolver: yupResolver(roomFormSchema),
    mode: 'all',
    defaultValues: {
      description: room.description,
      level: room.level,
      type: room.type,
      roomDirections: room.roomDirections,
      visited: room.visited,
    },
  });

  const handleSelectClick = () => {
    onRoomSelectButtonClicked(room);
  };

  const onSubmit = () => {
    const values = getValues();
    const newRoom: RoomDto = { ...values, id: room.id, type: values.type as RoomType };
    dispatch(updateRoom(newRoom));
    reset(newRoom);
  };

  return (
    <StyledWrapper>
      <HeaderContainer>
        <Typography variant="body1">Room</Typography>
        <ButtonContainer>
          <RoundIconButton onClick={handleSelectClick}>
            <Check
              fontSize="small"
              sx={
                selectedCell.currentRoom === room.id
                  ? {
                      color: 'darkGreen',
                    }
                  : null
              }
            />
          </RoundIconButton>
        </ButtonContainer>
      </HeaderContainer>
      <RoomForm control={control} onSubmit={handleSubmit(onSubmit)} validationErorrs={errors} />
    </StyledWrapper>
  );
}
