import { SvgIcon, SvgIconProps } from '@mui/material';

export interface IconProps extends SvgIconProps {}

const AddObject = (props: IconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 18 18'}>
      <rect x="15" width="1" height="5" />
      <rect x="13" y="3" width="1" height="5" transform="rotate(-90 13 3)" />
      <path d="M15 13.75L9 17L3 13.75V7.25L9 4L15 7.25V13.75Z" />
      <path
        d="M9 17L15 13.75V7.25M9 17L3 13.75V7.25M9 17V10.5M15 7.25L9 4L3 7.25M15 7.25L9 10.5M3 7.25L9 10.5"
        stroke="black"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
};

export default AddObject;
