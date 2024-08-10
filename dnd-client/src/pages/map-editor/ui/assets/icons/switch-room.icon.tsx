import { SvgIcon, SvgIconProps } from '@mui/material';

export interface IconProps extends SvgIconProps {}

const SwitchRoom = (props: IconProps) => {
  return (
    <SvgIcon {...props}>
      <path d="M50.7964 31.7158L35.1878 51.9371L11.7292 47.3392L3.87942 22.5202L19.4881 2.29892L42.9466 6.89676L50.7964 31.7158Z" />
      <rect x="7.5" y="60" width="52.5" height="8" fill="black" />
    </SvgIcon>
  );
};

export default SwitchRoom;
