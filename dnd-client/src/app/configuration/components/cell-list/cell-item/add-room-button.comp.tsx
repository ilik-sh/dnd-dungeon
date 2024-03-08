import React, { MouseEventHandler, SyntheticEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, styled } from "@mui/material";
import { Add } from "@mui/icons-material";

type Props = {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const StyledBox = styled(Box)({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  width: "100%",
  height: "100%",
});

const StyledButton = styled(IconButton)({
  width: "100%",
  height: "100%",
  borderRadius: "10px",
});

export default function AddRoomButton({ handleClick }: Props) {
  return (
    <StyledBox>
      <StyledButton onClick={handleClick}>
        <AddIcon />
      </StyledButton>
    </StyledBox>
  );
}
