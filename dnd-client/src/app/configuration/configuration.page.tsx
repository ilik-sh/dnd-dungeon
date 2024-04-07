import { VerticalContainer } from "components/vertical-container.comp";
import ConfigurationTabs from "./components/configuration-tabs.comp";

import { styled } from "@mui/material";
import { brown, grey, orange } from "@mui/material/colors";
import Header from "./components/header/header.comp";

type Props = {};

export default function ConfigurationPage({}: Props) {
  return (
    <>
      <Header />
      <VerticalContainer>
        <ConfigurationTabs />
      </VerticalContainer>
    </>
  );
}
