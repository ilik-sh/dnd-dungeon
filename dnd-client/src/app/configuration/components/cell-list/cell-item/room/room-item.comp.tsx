import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  SelectChangeEvent,
  Typography,
  styled,
} from "@mui/material";
import RoomVariantForm from "./room.form";
import { RoomChildDto } from "app/configuration/types/room-child.dto";
import { TypeColors } from "enums/type-colors.enum";
import { RoomType } from "enums/room-type.enum";
import { useForm } from "react-hook-form";
import { Room } from "app/configuration/types/forms/room.form";
import { yupResolver } from "@hookform/resolvers/yup";
import { roomFormSchema } from "app/configuration/validation-schemas/room-form.schema";
import { useAppDispatch } from "hooks/redux.hooks";
import {
  deleteRoom,
  selectRoom,
  updateRoom,
} from "app/configuration/store/manual-generation/manual-generation-config.slice";
import { Cancel, CheckCircle } from "@mui/icons-material";

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
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  gap: "20px",
  display: "flex",
  justifyContent: "equal-spacing",
}));

const StyledDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export default function RoomItem({ room, selected }: Props) {
  const dispatch = useAppDispatch();
  const {
    control,
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
    },
  });

  const onSubmit = () => {
    const values = getValues();
    const newRoom = {
      ...values,
      id: room.id,
      parentId: room.parentId,
      type: values.type as RoomType,
    };
    dispatch(updateRoom({ room: newRoom }));
  };

  const onDeleteButtonClicked = () => {
    dispatch(deleteRoom({ id: room.parentId, room }));
  };

  const onSelectButtonClicked = () => {
    dispatch(selectRoom({ id: room.parentId, room }));
  };

  return (
    <StyledBox>
      <StyledDiv>
        <Circle sx={{ color: TypeColors[room.type].light }}>&#x2B22;</Circle>
        <IconButton onClick={onDeleteButtonClicked}>
          <Cancel color="error"></Cancel>
        </IconButton>
        <IconButton onClick={onSelectButtonClicked}>
          <CheckCircle color={selected ? "success" : "disabled"}></CheckCircle>
        </IconButton>
      </StyledDiv>
      <RoomVariantForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        validationErorrs={errors}
      />
    </StyledBox>
  );
}
