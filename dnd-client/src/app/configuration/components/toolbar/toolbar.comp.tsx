import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Toolbar as MUIToolbar, Paper } from "@mui/material";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Close,
  Download,
  PointOfSaleOutlined,
  Upload,
} from "@mui/icons-material";
import { Container } from "@mui/system";
import useDownload from "hooks/use-download.hook";
import { useAppSelector } from "hooks/redux.hooks";
import { mapSelector } from "app/map/store/map.selector";

const ToolbarPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  maxWidth: "64px",
  height: "calc(100% - 64px)",
  top: "64px",
  left: 0,
  [theme.breakpoints.down("sm")]: {
    top: "56px",
  },
}));

export default function Toolbar() {
  const { map } = useAppSelector(mapSelector);
  const handleDownload = useDownload(map);
  return (
    <ToolbarPaper elevation={4}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <IconButton>
          <Close></Close>
        </IconButton>
        <IconButton>
          <PointOfSaleOutlined></PointOfSaleOutlined>
        </IconButton>
        <IconButton onClick={handleDownload}>
          <Download></Download>
        </IconButton>
        <IconButton>
          <Upload></Upload>
          <input type="file" />
        </IconButton>
      </div>
    </ToolbarPaper>
  );
}
