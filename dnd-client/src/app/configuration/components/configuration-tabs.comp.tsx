import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AutoGenerationTab from "./auto-generation-tab/auto-generation-tab.comp";
import ManualGenerationTab from "./manual-generation-tab/manual-generation-tab.comp";

type Props = {};

export default function ConfigurationTabs({}: Props) {
  const [value, setValue] = React.useState("auto");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Auto" value="auto" />
            <Tab label="Manual" value="manual" />
          </TabList>
        </Box>
        <TabPanel value="auto">
          <AutoGenerationTab />
        </TabPanel>
        <TabPanel value="manual">
          <ManualGenerationTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
