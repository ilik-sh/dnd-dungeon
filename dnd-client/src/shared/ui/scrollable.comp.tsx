import React, { ReactNode, useRef, useState } from 'react';

import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Box, IconButton, styled } from '@mui/material';

type ScrollableProps = {
  children: ReactNode;
  scrollButtons?: boolean;
};

const Scroller = styled(Box)({
  display: 'flex',
  paddingTop: '5px',
  justifyContent: 'space-evenly',
  overflowX: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  scrollBehavior: 'smooth',
  '&::webkit-scrollbar': {
    display: 'none',
  },
});

const ArrowButton = styled(IconButton)({
  borderRadius: '0px',
  width: '20px',
});

export default function Scrollable({ children, scrollButtons, ...props }: ScrollableProps) {
  const scrollRef = useRef(null);

  const [leftButtonVisible, setLeftButtonVisible] = useState(false);
  const [rightButtonVisible, setRightButtonVisible] = useState(false);

  const handleRightButtonClick = () => {
    scrollRef.current.scrollLeft += 100;
  };

  const handleLeftButtonClick = () => {
    scrollRef.current.scrollLeft -= 100;
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollWidth, scrollLeft, clientWidth } = e.currentTarget;

    const end = scrollWidth - scrollLeft - clientWidth <= 1;
    const start = scrollLeft === 0;

    setRightButtonVisible(true);
    setLeftButtonVisible(true);
    if (end) {
      setRightButtonVisible(false);
    }
    if (start) {
      setLeftButtonVisible(false);
    }
  };

  return (
    <>
      {scrollButtons ? (
        <ArrowButton onClick={handleLeftButtonClick} sx={!leftButtonVisible ? { visibility: 'hidden' } : null}>
          <ArrowLeft></ArrowLeft>
        </ArrowButton>
      ) : null}

      <Scroller ref={scrollRef} onScroll={handleScroll} {...props}>
        {children}
      </Scroller>

      {scrollButtons ? (
        <ArrowButton onClick={handleRightButtonClick} sx={!rightButtonVisible ? { visibility: 'hidden' } : null}>
          <ArrowRight></ArrowRight>
        </ArrowButton>
      ) : null}
    </>
  );
}
