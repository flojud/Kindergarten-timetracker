import Box, { BoxProps } from '@mui/material/Box';

const item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        m: 2,
        ...sx,
      }}
      {...other}
    />
  );
};

export default item;
