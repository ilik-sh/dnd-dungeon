import { Check, Remove, Widgets } from '@mui/icons-material';
import { Box, Button, IconButton, Typography, styled } from '@mui/material';
import React from 'react';
import { RoomDto } from 'types/room.dto';

type RoomPropertiesProps = {
  room: RoomDto;
  onRoomDeleteButtonClicked: (room: RoomDto) => void;
  onRoomSelectButtonClicked: (room: RoomDto) => void;
};

const StyledWrapper = styled(Box)({});

const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'center',
  alignItems: 'center',
});

const RoundIconButton = styled(IconButton)({
  borderRadius: '0',
});

const StyledTypography = styled(Typography)({
  textAlign: 'center',
});

const ButtonContainer = styled(Box)({});

export default function RoomProperties({
  room,
  onRoomDeleteButtonClicked,
  onRoomSelectButtonClicked,
}: RoomPropertiesProps) {
  const handleDeleteClick = () => {
    onRoomDeleteButtonClicked(room);
  };
  const handleSelectClick = () => {
    onRoomSelectButtonClicked(room);
  };
  return (
    <StyledWrapper>
      <HeaderContainer>
        <Typography variant="body1">Room</Typography>
        <ButtonContainer>
          <RoundIconButton>
            <Check fontSize="small" />
          </RoundIconButton>
          <RoundIconButton>
            <Remove fontSize="small" />
          </RoundIconButton>
        </ButtonContainer>
      </HeaderContainer>
      <p>{room.id}</p>
      <p>{room.type}</p>
      <p>{room.level}</p>
    </StyledWrapper>
  );
}
