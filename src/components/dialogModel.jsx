import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';

const LocationServiceDialog = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Use Google's location service?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Disagree</Button>
          <Button colorScheme="blue" onClick={onClose} ml={3}>Agree</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LocationServiceDialog;
