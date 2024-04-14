import { Box, IconButton, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { Close } from '@mui/icons-material';
import { setSelectedCell } from 'app/configuration/store/map.slice';
import CellItemComp from '../cell-list/cell-item/cell-item.comp';
import { mapSelector } from 'app/configuration/store/map.selector';
import { linear2dSearch } from 'utils/linear2dSearch';

type Props = {};

const FixedSidebar = styled(Box)(({ theme }) => ({
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  right: '0',
  top: '0',
  zIndex: '999',

  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

const StyledButton = styled(Close)({
  width: '40px',
  height: '40px',
});

const Wrapper = styled(Box)({
  padding: '30px',
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
