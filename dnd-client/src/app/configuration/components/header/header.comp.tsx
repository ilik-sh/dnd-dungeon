import { Container, Typography, styled } from "@mui/material";
import { amber, blueGrey, green, grey } from "@mui/material/colors";
import React from "react";

type Props = {};

const StyledHeader = styled(Container)(({ theme }) => ({
  backgroundColor: grey[800],
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  padding: "20px",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "900",

  color: theme.palette.primary.main,
}));

export default function Header({}: Props) {
  return (
    <StyledHeader>
      <StyledTypography variant="h4">DnD Dungeon</StyledTypography>
    </StyledHeader>
  );
}
