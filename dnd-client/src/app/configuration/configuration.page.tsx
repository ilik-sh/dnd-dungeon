import { VerticalContainer } from "components/vertical-container.comp";
import ConfigurationTabs from "./components/configuration-tabs.comp";
import Lottie from "lottie-react";
import fireAnimation from "../../../public/fire.json";
import { styled } from "@mui/material";
import { brown, grey, orange } from "@mui/material/colors";

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
      boxShadow: `1px 1px 150px ${grey[800]}`,
      background: `#42424240`,
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
    background: `linear-gradient(to left, ${brown[800]} 90%, ${orange[700]} 100%)`,
    top: "32vmin",
    left: "52%",
    borderRadius: "20px 80px 80px 20px",
    position: "absolute",

    transform: "translate(-50%, -50%) rotate(90deg) rotateX(18deg)",

    clipPath: "polygon(0 0, 0 100%, 100% 60%, 100% 40%)",
  },
});

const ShadowContainer = styled("div")({});

export default function ConfigurationPage({}: Props) {
  return (
    <VerticalContainer>
      <StyledLottie animationData={fireAnimation} loop={true}></StyledLottie>
      <ConfigurationTabs />
    </VerticalContainer>
  );
}
