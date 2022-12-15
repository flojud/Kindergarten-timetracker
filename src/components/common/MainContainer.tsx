import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
type Props = { children: ReactNode };

const MainContainer = ({ children }: Props) => {
  return (
    <>
      <Box
        p={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
        {children}
      </Box>
    </>
  );
};

export default MainContainer;
