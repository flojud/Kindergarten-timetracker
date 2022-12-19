import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabMyProfileCard from './TabMyProfileCard';
import TabSecurityCard from './TabSecurityCard';
import TabMyDataCard from './TabMyDataCard';

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
        <TabMyDataCard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabMyProfileCard />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabSecurityCard />
      </TabPanel>
    </Box>
  );
};

export default ProfileSettingsTabs;
