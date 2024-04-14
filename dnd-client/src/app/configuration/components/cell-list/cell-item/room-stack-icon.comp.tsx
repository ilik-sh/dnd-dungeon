import { Stack, styled } from '@mui/material';
import { TypeColors } from 'enums/type-colors.enum';
import React from 'react';
import { RoomDto } from 'types/room.dto';

type RoomIconStackProps = {
  rooms: RoomDto[];
};

const RoomRectangle = styled('div')({
  lineHeight: '10px',
  fontSize: '60px',
  textAlign: 'center',
});

const StyledStack = styled(Stack)({
  ':hover': {
    animation: 'expand 0.25s both',
  },

  '@keyframes expand': {
    '0%': {
      gap: '0px',
    },
    '100%': {
      gap: '10px',
    },
  },
});

export default function RoomIconStack({ rooms }: RoomIconStackProps) {
  return (
    <StyledStack direction="column">
      {rooms.map((room, index) => (
        <RoomRectangle
          key={index}
          sx={{
            zIndex: `${9 - index}`,
            color: TypeColors[room.type].light,
            transform: `translateY(${index * -3}px) rotateX(60deg) rotateZ(20deg) rotateY(0deg)`,
            textShadow: `0px 5px 5px ${TypeColors[room.type].dark}, 2px 5px 5px ${TypeColors[room.type].dark}`,
          }}
        >
          &#x2B22;
        </RoomRectangle>
      ))}
    </StyledStack>
  );
}
