import { Check, Hexagon, Remove } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { getSelectedCell } from 'app/configuration/store/map.selector';
import { TypeColors } from 'enums/type-colors.enum';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import React, { useEffect } from 'react';
import { RoomDto } from 'types/room.dto';
import RoomForm from './room-properties.form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Room } from 'app/configuration/types/forms/room.form';
import { roomFormSchema } from 'app/configuration/validation-schemas/room-form.schema';
import { useForm } from 'react-hook-form';
import { updateRoom } from 'app/configuration/store/map.slice';
import { RoomType } from 'enums/room-type.enum';

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
  } = useForm<Room>({
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
