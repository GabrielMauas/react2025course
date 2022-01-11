import { Box, Code, Switch } from '@chakra-ui/react';

import DeleteFeedbackButton from './DeleteFeedbackButton';
import { Table, Tr, Th, Td } from './Table';

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Status</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {allFeedback.map((feedback, index) => (
            <Box as="tr" key={feedback.id}>
              <Td fontWeight="medium">{}</Td>
              <Td>{feedback.text}</Td>
              <Td>
                <Code>{'/'}</Code>
              </Td>
              <Td>
                <Switch
                  defaultIsChecked={feedback.status === 'active'}
                  colorScheme="green"
                />
              </Td>
              <Td>
                <DeleteFeedbackButton feedbackId={feedback.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
