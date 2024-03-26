import ManualGenerationForm from "./manual-generation-form.comp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { manualGenerationFormSchema } from "../../validation-schemas/manual-generation-form.schema";
import ConfigureMap from "./configure-map.comp";
import Sidebar from "../sidebar/sidebar.comp";
import Header from "../header/header.comp";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import {
  addMultiplySelectedCell,
  selectRoomAmongMultipleSelectedCells,
  toggleMultipleSelection,
} from "app/map/store/map.slice";
import { mapSelector } from "app/map/store/map.selector";
import { ChangeEvent, useState } from "react";
import { enqueueSnackbar } from "notistack";

type Props = {};

const roomNumbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

const StyledDiv = styled("div")({
  display: "flex",
});

export default function ManualGenerationTab({}: Props) {
  const dispatch = useAppDispatch();

  const [room, setRoom] = useState("1");
  const { multipleSelection } = useAppSelector(mapSelector);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(manualGenerationFormSchema),
  });

  const handleClick = () => {
    dispatch(toggleMultipleSelection());
  };

  const handleChangeButtonClick = () => {
    try {
      dispatch(selectRoomAmongMultipleSelectedCells(+room));
    } catch (e) {
      enqueueSnackbar(
        "Room with that number does not exist on one or more cells"
      );
      dispatch(toggleMultipleSelection());
    }
  };

  const onChange = (e: SelectChangeEvent) => {
    setRoom(e.target.value);
  };

  const onSubmit = () => {};
  return (
    <>
      <Sidebar />
      <Button variant="outlined" onClick={handleClick}>
        Cancel selection
      </Button>
      <StyledDiv>
        <Select
          id="newRoom"
          name="Room number"
          value={room}
          onChange={onChange}
        >
          {roomNumbers.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleChangeButtonClick}>Change</Button>
      </StyledDiv>
      <ConfigureMap />
    </>
  );
}
