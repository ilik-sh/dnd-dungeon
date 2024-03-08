import React from "react";
import { HorizontalContainer } from "components/horizontal-container.comp";
import { VerticalContainer } from "components/vertical-container.comp";
import ConfigurationTabs from "./components/configuration-tabs.comp";
import { Typography } from "@mui/material";

type Props = {};

export default function ConfigurationPage({}: Props) {
  return (
    <VerticalContainer>
      <Typography>CONFIGURATION</Typography>
      <ConfigurationTabs />
    </VerticalContainer>
  );
}
