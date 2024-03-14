import React, { useMemo, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack, Typography, styled } from "@mui/material";
import Room from "./room/room-item.comp";
import { useAppDispatch } from "hooks/redux.hooks";
import { TypeColors } from "enums/type-colors.enum";
import { RoomChildDto } from "app/configuration/types/room-child.dto";
import { CellDto } from "app/configuration/types/cell.dto";
import AddRoomButton from "./add-room-button.comp";
import { addRoom } from "app/map/store/map.slice";
import { v4 } from "uuid";
import { RoomType } from "enums/room-type.enum";
import { defaultDirections } from "app/configuration/default-objects/default-directions";
import { amber } from "@mui/material/colors";

type CellItemProps = {
  cell: CellDto;
};

const RoomRectangle = styled("div")({
  lineHeight: "10px",
  fontSize: "60px",
  textAlign: "center",
});

const StyledStack = styled(Stack)({
  ":hover": {
    animation: "expand 0.25s both",
  },

  "@keyframes expand": {
    "0%": {
      gap: "0px",
    },
    "100%": {
      gap: "10px",
    },
  },
});

const CustomGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  overflowY: "auto",
  overflowX: "hidden",
  maxHeight: "80vh",
});

const SummaryBox = styled("div")({
  alignItems: "center",
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
});

function CellItem({ cell }: CellItemProps) {
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const room: RoomChildDto = {
      id: v4(),
      parentId: cell.id,
      type: "neutral" as RoomType,
      level: 1,
      description: " ",
      directions: defaultDirections,
      isVisited: false,
    };
    dispatch(addRoom({ room }));
  };
  return (
    <>
      <SummaryBox>
        <StyledStack direction="column">
          {cell.rooms.map((room, index) => (
            <RoomRectangle
              key={index}
              sx={{
                zIndex: `${9 - index}`,
                color: TypeColors[room.type].light,
                transform: `translateY(${
                  index * -3
                }px) rotateX(60deg) rotateZ(20deg) rotateY(0deg)`,
                textShadow: `0px 5px 5px ${
                  TypeColors[room.type].dark
                }, 2px 5px 5px ${TypeColors[room.type].dark}`,
              }}
            >
              &#x2B22;
            </RoomRectangle>
          ))}
        </StyledStack>
      </SummaryBox>
      <CustomGrid>
        {cell.rooms.map((room, index) => (
          <Box key={index}>
            <Room selected={cell.currentRoom?.id == room.id} room={room} />
          </Box>
        ))}
        <Box>
          <AddRoomButton handleClick={handleClick} />
        </Box>
      </CustomGrid>
    </>
  );
}

export default CellItem;
