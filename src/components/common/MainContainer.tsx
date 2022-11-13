import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
type Props = { children: ReactNode };

const MainContainer = ({ children }: Props) => {
  /*
            backgroundImage: `url(${'/images/pexels-roger-brown-5656552.jpeg'})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
  */
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
