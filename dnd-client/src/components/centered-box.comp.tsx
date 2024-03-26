import { Box, styled } from "@mui/material";

export const CenteredBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
}));
