import { SvgIcon, SvgIconProps } from '@mui/material';

export interface IconProps extends SvgIconProps {}

const AddCell = (props: IconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 18 18'} fill="none">
      <path d="M2 9.5L4.75 4.73686H10.25L13 9.5L10.25 14.2631H4.75L2 9.5Z" />
      <rect x="15" width="1" height="5" />
      <rect x="13" y="3" width="1" height="5" transform="rotate(-90 13 3)" />
    </SvgIcon>
  );
};

export default AddCell;
