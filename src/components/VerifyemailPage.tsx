import { Stack } from '@mui/material';
import { ReactComponent as MailSvg } from '../svg/mail.svg';
import MainContainer from './common/MainContainer';
const VerifyemailPage = () => {
  return (
    <>
      <MainContainer>
        <Stack direction="column" alignItems="center" spacing={0}>
          <MailSvg width="150px" height="150px" />
          <h1>Bitte bestätige deine Mail-Adresse</h1>
          <p>Bald kann es los gehen ... </p>
          <p>Doch zuvor bitten wir dich deine Mail-Adresse noch zu verifizierren.</p>
          <p>Du hast eine Email mit einem Bestätigungslink von uns erhalten.</p>
          <p>Einfach bestätigen und schon kann es los gehen!</p>
        </Stack>
      </MainContainer>
    </>
  );
};

export default VerifyemailPage;
