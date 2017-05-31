import React from 'react';
import Section from 'grommet/components/Section';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

const EndorsementCreator = ({ closeEC }) => (
  <Section>
    <Layer closer onClose={closeEC}>
      <Form>
        <Header>
          <Heading>
            Sample Header
          </Heading>
        </Header>
        <FormFields>
          <t />
        </FormFields>
        <Footer pad={{"vertical": "medium"}}>
          <Button label='Submit'
            type='submit'
            primary={true}
          />
        </Footer>
      </Form>
    </Layer>
  </Section>

);

export default EndorsementCreator;
