import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = { children: ReactNode };

const MainContainer = ({ children }: Props) => {
  return (
    <>
      <Box m={2} p={2} sx={{ display: 'flex', flexDirection: 'column', m: 1, p: 1 }}>
        {children}
      </Box>
    </>
  );
};

export default MainContainer;
