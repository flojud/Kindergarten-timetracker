import { Box, LinearProgress, Tab, Tabs, Typography } from '@mui/material';
import React, { Suspense, lazy } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const ProfileSettingsTabs = () => {
  const TabMyProfileCard = lazy(() => import('./TabMyProfileCard'));
  const TabSecurityCard = lazy(() => import('./TabSecurityCard'));
  const TabMyDataCard = lazy(() => import('./TabMyDataCard'));

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Meine Daten" {...a11yProps(0)} />
          <Tab label="Konto" {...a11yProps(1)} />
          <Tab label="Security" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <TabMyDataCard />
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <TabMyProfileCard />
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <TabSecurityCard />
        </Suspense>
      </TabPanel>
    </Box>
  );
};

export default ProfileSettingsTabs;
