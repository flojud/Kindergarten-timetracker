import { Box, Stack, Typography, IconButton, Link, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ToggleColorModeProperties {
  light: boolean | null;
  toggle: () => void;
}

const ToggleColorMode = ({ light, toggle }: ToggleColorModeProperties) => {
  return (
    <>
      {light || light == null ? (
        <ListItemButton onClick={toggle}>
          <ListItemIcon>
            <Brightness7Icon />
          </ListItemIcon>
          <ListItemText primary="light mode" />
        </ListItemButton>
      ) : (
        <ListItemButton onClick={toggle}>
          <ListItemIcon>
            <Brightness7Icon />
          </ListItemIcon>
          <ListItemText primary="dark mode" />
        </ListItemButton>
      )}
    </>
  );
};

export default ToggleColorMode;
