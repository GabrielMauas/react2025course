import { useRef } from 'react';
import { useSWRConfig } from 'swr'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl, 
    Input,
    FormLabel,
    useDisclosure,
    useToast
  } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const AddSiteModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, resetField } = useForm();

    const { mutate } = useSWRConfig()
  
    const nameRef = useRef();
    const linkRef = useRef();

    const toast = useToast();
    const { currentUser} = useAuth();

    const onCreateSite = ({siteName, siteUrl}) => {
        const newSite = {
          author: currentUser.uid,
          createdAt: new Date().toISOString(),
          siteName,
          siteUrl
        }
        createSite(newSite);
        toast({
          title: 'Success!',
          description: "We've added your site.",
          status: 'success',
          duration: 3000,
          isClosable: true,
      })

      mutate('/api/sites', async (data) => {
        return { sites: [...data.sites, newSite] }
      }, false);

      resetField('siteName');
      resetField('siteUrl');

      onClose();
    }
 
    return (
      <>
        <Button 
            onClick={onOpen} 
            fontWeight="600" 
            bgColor="black" 
            color="white" 
            _hover={{bgColor: "gray.300", color: "black"}} 
            _focus={{border:"none"}} 
            _active={{transform: "scale(0.96)"}} 
        >
            {children}
        </Button>
  
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset='slideInBottom'
          autoFocus={false}
          initialFocusRef={nameRef}
        >
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)} >
            <ModalHeader fontWeight="bold">Add Site</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoComplete='off' ref={nameRef} placeholder='My Site' {...register("siteName", { required: true })} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Link</FormLabel>
                <Input autoComplete='off' ref={linkRef} placeholder='https://website.com' {...register("siteUrl", { required: true })} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
                <Button fontWeight="medium" mr={3} onClick={onClose}>Cancel</Button>

                <Button type="submit" fontWeight="medium" color="#194D4C" bgColor='#99FFFE'>
                    Create
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default AddSiteModal;