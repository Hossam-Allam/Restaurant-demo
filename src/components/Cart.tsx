import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';

const CartIcon = () => {
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <div onClick={open}> {/* Open the modal when the CartIcon is clicked */}
        {/* Add your CartIcon component here */}
      </div>
      <Modal open={isOpen} onClose={close} blockScroll>
        <ModalContent>
          <ModalHeader>Shopping Cart</ModalHeader>
          <ModalBody>
            {/* Add your cart content here */}
          </ModalBody>
          <ModalFooter>
            <button onClick={close}>Close</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartIcon;
