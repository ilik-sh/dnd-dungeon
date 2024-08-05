import React, { ImgHTMLAttributes, useState } from 'react';

import { Skeleton } from '@mui/material';
import { styled } from '@mui/system';

type ImageProps = {
  src: string;
  alt: string;
  height: number | string;
  width: number | string;
} & ImgHTMLAttributes<HTMLImageElement>;

const StyledImage = styled('img')(({ theme }) => ({
  transition: 'opacity 0.8s ',
}));

const Image = ({ src, alt, height, width, ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? <Skeleton variant="rectangular" width={width} height={height}></Skeleton> : null}
      <StyledImage
        {...props}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sx={{
          position: isLoading ? 'absolute' : 'initial',
          opacity: isLoading ? '0' : '1',
        }}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

export const MemoizedImage = React.memo(Image);
