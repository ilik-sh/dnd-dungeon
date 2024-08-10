import { SvgIcon, SvgIconProps } from '@mui/material';

export interface IconProps extends SvgIconProps {}

const AddCell = (props: IconProps) => {
  return (
    <SvgIcon {...props}>
      <path d="M14 12.5L10.5 19.8612H3.5L0 12.5L3.5 5.13878L10.5 5.13878L14 12.5Z" />
      <rect x="17.4722" width="1.38889" height="10" />
      <rect x="22.3333" y="4.16663" width="1.66667" height="8.33333" transform="rotate(90 22.3333 4.16663)" />
    </SvgIcon>
  );
};

export default AddCell;
