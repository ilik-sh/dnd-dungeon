import { SvgIcon, SvgIconProps } from '@mui/material';

export interface IconProps extends SvgIconProps {}

const AddRow = (props: IconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 18 18'}>
      <path d="M4 15.0909L5.45455 12.5716H8.36364L9.81818 15.0909L8.36364 17.6103H5.45455L4 15.0909Z" />
      <path d="M4 4.90909L5.45455 2.38974H8.36364L9.81818 4.90909L8.36364 7.42843H5.45455L4 4.90909Z" />
      <path d="M4 10L5.45455 7.48068H8.36364L9.81818 10L8.36364 12.5194H5.45455L4 10Z" />
      <rect x="15" width="1" height="5" />
      <rect x="13" y="3" width="1" height="5" transform="rotate(-90 13 3)" />
    </SvgIcon>
  );
};

export default AddRow;
