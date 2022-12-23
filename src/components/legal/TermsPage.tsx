import { config } from '../../firebase/config';
import Item from '../common/Item';
import MainContainer from '../common/MainContainer';

const Terms = () => {
  return (
    <>
      <MainContainer>
        <Item>
          <h1>Impressum</h1>
          <p>Angaben gemäß § 5 TMG</p>
          <p>{config.contact.name}</p>
          <p>{config.contact.street}</p>
          <p>{config.contact.city}</p>
          <p>
            E-Mail: <a href={config.contact.email}>{config.contact.email}</a>
          </p>
        </Item>
      </MainContainer>
    </>
  );
};

export default Terms;
