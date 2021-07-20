import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

function CustomModal({ open, setOpen }) {
//   const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Not Found</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Data not found</Header>
          <p>Sorry, the data of the category you requested is not found</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="That's OK"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CustomModal;
