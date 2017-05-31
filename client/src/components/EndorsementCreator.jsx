import React from 'react';
import Section from 'grommet/components/Section';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import FormField from 'grommet/components/FormField';
import Checkbox from 'grommet/components/Checkbox';
import TextInput from 'grommet/components/TextInput';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

const EndorsementCreator = ({ closeEC }) => (
  <Section>
    <Layer closer onClose={closeEC}>
      <Form>
        <Header>
          <Heading>
            Endorse
          </Heading>
        </Header>

        <FormField>
          <Checkbox label="Javascript"/>
        </FormField>
        <FormField>
          <Checkbox label="React"/>
        </FormField>
        <FormField>
          <Checkbox label="Node"/>
        </FormField>
        <FormField label="Comments">
          <TextInput />
        </FormField>
        <Footer pad={{"vertical": "medium"}}>
          <Button
            primary
            label="Submit"
            type="button"
            onClick={()=> {}}
          />
        </Footer>
      </Form>
    </Layer>
  </Section>

);

export default EndorsementCreator;
