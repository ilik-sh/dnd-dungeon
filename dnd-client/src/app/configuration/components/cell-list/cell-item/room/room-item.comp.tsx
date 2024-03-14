import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  SelectChangeEvent,
  Typography,
  styled,
} from "@mui/material";
import RoomForm from "./room.form";
import { RoomChildDto } from "app/configuration/types/room-child.dto";
import { TypeColors } from "enums/type-colors.enum";
import { RoomType } from "enums/room-type.enum";
import { useForm } from "react-hook-form";
import { Room } from "app/configuration/types/forms/room.form";
import { yupResolver } from "@hookform/resolvers/yup";
import { roomFormSchema } from "app/configuration/validation-schemas/room-form.schema";
import { useAppDispatch } from "hooks/redux.hooks";
import { deleteRoom, selectRoom, updateRoom } from "app/map/store/map.slice";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { Direction } from "enums/directions.enum";
import { amber, blueGrey, grey } from "@mui/material/colors";

type Props = {
  room: RoomChildDto;
  selected: boolean;
};

const Circle = styled("div")({
  textAlign: "center",
  fontSize: "40px",
  lineHeight: "40px",
});

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
  gap: "1em",
  background: "#292929",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  padding: "20px",
  boxShadow: `0 10px 10px #00000050,0 6px 5px #00000050`,
}));

const StyledDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export default function RoomItem({ room, selected }: Props) {
  const dispatch = useAppDispatch();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Room>({
    resolver: yupResolver(roomFormSchema),
    mode: "all",
    defaultValues: {
      description: room.description,
      level: room.level,
      type: room.type,
      directions: room.directions,
      isVisited: room.isVisited,
    },
  });

  useEffect(() => {
    reset(room);
  }, [room]);

  const onSubmit = () => {
    const values = getValues();
    const newRoom: RoomChildDto = {
      ...values,
      id: room.id,
      parentId: room.parentId,
      type: values.type as RoomType,
      directions: values.directions,
    };
    dispatch(updateRoom(newRoom));
  };

  const onDeleteButtonClicked = () => {
    dispatch(deleteRoom(room));
  };

  const onSelectButtonClicked = () => {
    dispatch(selectRoom(room));
  };

  return (
    <StyledBox>
      <StyledDiv>
        <Circle sx={{ color: TypeColors[room.type].light }}>&#x2B22;</Circle>
        <IconButton onClick={onDeleteButtonClicked} disabled={selected}>
          <Cancel color={selected ? "disabled" : "error"}></Cancel>
        </IconButton>
        <IconButton onClick={onSelectButtonClicked}>
          <CheckCircle color={selected ? "success" : "disabled"}></CheckCircle>
        </IconButton>
      </StyledDiv>
      <RoomForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        validationErorrs={errors}
      />
    </StyledBox>
  );
}
