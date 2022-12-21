import Item from '../common/Item';
import MainContainer from '../common/MainContainer';

const Terms = () => {
  return (
    <>
      <MainContainer>
        <Item>
          <h1>Impressum</h1>

          <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
          <p>
            Max Mustermann
            <br />
            Musterstra&szlig;e 111
            <br />
            Geb&auml;ude 44
            <br />
            90210 Musterstadt
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: +49 (0) 123 44 55 66
            <br />
            Telefax: +49 (0) 123 44 55 99
            <br />
            E-Mail: mustermann@musterfirma.de
          </p>
        </Item>
      </MainContainer>
    </>
  );
};

export default Terms;
