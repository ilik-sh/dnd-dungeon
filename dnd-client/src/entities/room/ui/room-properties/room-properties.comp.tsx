import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Check } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';

import { RoomDto } from 'entities/room/model/types/room.dto';

import { RoomType } from 'shared/libs/enums/room-type.enum';

import { roomFormSchema, RoomFormYup } from '../../model/validation-schemas/room-form.schema';
import RoomForm from './room-properties.form';

type RoomPropertiesProps = {
  room: RoomDto;
  updateAction: (room: RoomDto) => void;
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

export default function RoomProperties({ room, updateAction }: RoomPropertiesProps) {
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
      id: room.id,
      description: room.description,
      level: room.level,
      type: room.type,
      roomDirections: room.roomDirections,
      visited: room.visited,
      textureUrl: room.textureUrl,
    },
  });

  console.log(getValues());

  const onSubmit = () => {
    const values = getValues();
    const newRoom: RoomDto = { ...values, id: room.id, type: values.type as RoomType };
    console.log('update');
    updateAction(newRoom);
    reset(newRoom);
  };

  return (
    <StyledWrapper>
      <HeaderContainer>
        <Typography variant="body1">Room</Typography>
      </HeaderContainer>
      <RoomForm control={control} onSubmit={handleSubmit(onSubmit)} validationErorrs={errors} />
    </StyledWrapper>
  );
}
