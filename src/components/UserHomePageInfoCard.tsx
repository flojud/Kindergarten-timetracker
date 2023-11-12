import { Card, CardContent, Stack, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface UserHomePageInfoCardPropertioes {
  title: string;
  value: string;
  subtitle: string;
  SvgIcon: OverridableComponent<SvgIconTypeMap>;
}

const UserHomePageInfoCard = ({ title, value, subtitle, SvgIcon }: UserHomePageInfoCardPropertioes) => {
  return (
    <>
      <Card sx={{ minWidth: 256 }}>
        <CardContent>
          <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" gap={2} width="100%">
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2} width="100%">
              <Typography variant="body1" color="text.secondary">
                {title}
              </Typography>
              <SvgIcon color="secondary" />
            </Stack>

            <Typography variant="h4" color="text.primary">
              {value}
            </Typography>
            <Typography variant="body2" color="text.disabled">
              {subtitle}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default UserHomePageInfoCard;
