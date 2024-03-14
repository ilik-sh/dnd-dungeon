import { Box, IconButton, MenuItem, Select, styled } from "@mui/material";
import { manualGenerationConfigSelector } from "app/configuration/store/manual-generation/manual-generation-config.selector";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { Close } from "@mui/icons-material";
import { setSelectedCell } from "app/map/store/map.slice";
import CellItemComp from "../cell-list/cell-item/cell-item.comp";
import { mapSelector } from "app/map/store/map.selector";
import HexItem from "components/hex-column/hex-item/hex-item.comp";
import { linear2dSearch } from "utils/linear2dSearch";

type Props = {};

const FixedSidebar = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "30%",
  background: "rgba(0, 0, 0, 0.5)",
  position: "fixed",
  right: "0",
  top: "0",
  zIndex: "999",
  transition: "transform 0.3s ease-in",

  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

const StyledButton = styled(Close)({
  width: "40px",
  height: "40px",
});

const Wrapper = styled(Box)({
  padding: "30px",
});

export default function Sidebar({}: Props) {
  const { selectedCellId, map } = useAppSelector(mapSelector);
  const dispatch = useAppDispatch();
  const selectedCell = linear2dSearch(map, selectedCellId);

  const handleCloseButtonClick = () => {
    dispatch(setSelectedCell(null));
  };

  if (!selectedCell) {
    return null;
  }

  return (
    <FixedSidebar>
      <IconButton onClick={handleCloseButtonClick}>
        <StyledButton />
      </IconButton>
      <Wrapper>
        <CellItemComp cell={selectedCell}></CellItemComp>
      </Wrapper>
    </FixedSidebar>
  );
}