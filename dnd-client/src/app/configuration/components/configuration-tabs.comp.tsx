import React from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ManualGenerationTab from "./manual-generation-tab/manual-generation-tab.comp";

type Props = {};

export default function ConfigurationTabs({}: Props) {
  return <ManualGenerationTab />;
}
