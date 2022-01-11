import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { useSWRConfig } from 'swr';

import { deleteFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const DeleteFeedbackButton = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const onClose = () => setIsOpen(false);
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const { currentUser } = useAuth();

  const onDeleteFeedback = (e) => {
    e.preventDefault();

    deleteFeedback(feedbackId);
    toast({
      title: 'Done!',
      description: "We've deleted that feedback.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    mutate(
      currentUser ? ['/api/feedback', currentUser.token] : null,
      async (data) => {
        return {
          feedback: data.feedback.filter(
            (feedback) => feedbackId !== feedback.id
          ),
        };
      },
      false
    );

    onClose();
  };

  return (
    <>
      <IconButton
        icon={<DeleteIcon />}
        variant="ghost"
        aria-label="Delete feedback"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              {"Are you sure? You can't undo this action afterwards."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteFeedback} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteFeedbackButton;
