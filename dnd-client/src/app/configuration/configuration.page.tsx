import { VerticalContainer } from "components/vertical-container.comp";
import ConfigurationTabs from "./components/configuration-tabs.comp";
import Lottie from "lottie-react";
import fireAnimation from "../../../public/fire.json";
import { styled } from "@mui/material";
import { brown, grey, orange } from "@mui/material/colors";
import Header from "./components/header/header.comp";

type Props = {};

const StyledLottie = styled(Lottie)({
  position: "absolute",
  right: "50px",
  width: "20vmin",
  height: "20vmin",
  animation: "2s ease-in-out 1s infinite alternate fire",
  borderRadius: "100%",
  background: "#ef6c0050",

  "@keyframes fire": {
    "0%": {
      boxShadow: `1px 1px 190px ${grey[800]}`,
      background: `#42424240`,
    },
    "70%": {
      background: "#ef6c0040",
      boxShadow: `1px 1px 190px ${orange[800]}`,
    },
    "100%": {
      background: "#ef6c0040",
      boxShadow: `1px 1px 200px ${orange[800]}`,
    },
  },

  "&:before": {
    content: '""',
    display: "block",
    width: "30vmin",
    height: "6vmin",
    backgroundColor: brown[900],
    top: "32vmin",
    left: "52%",
    borderRadius: "20px 80px 80px 20px",
    position: "absolute",
    boxShadow: `5px -10px 10px rgba(0,0,0,0.5)`,
    transform: "translate(-50%, -50%) rotate(90deg) rotateX(18deg)",
  },
});

const ShadowContainer = styled("div")({});

export default function ConfigurationPage({}: Props) {
  return (
    <>
      <Header />
      <VerticalContainer>
        <StyledLottie animationData={fireAnimation} loop={true}></StyledLottie>
        <ConfigurationTabs />
      </VerticalContainer>
    </>
  );
}
