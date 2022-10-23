import { Box } from '@mui/material';
import React from 'react';
import MainContainer from '../../components/MainContainer';

const Add = () => {
  return (
    <>
      <MainContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            maxWidth: '400px',
          }}>
          Add
        </Box>
      </MainContainer>
    </>
  );
};

export default Add;
