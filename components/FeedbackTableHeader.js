import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const FeedbackTableHeader = () => {
  return (
    <Flex mb={4} direction="row" justify="space-between" align="center">
      <Box>
        <Breadcrumb color="gray.700">
          <BreadcrumbItem>
            <BreadcrumbLink>Feedback</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink></BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading fontWeight="800" size="xl">
          My Feedback
        </Heading>
      </Box>
      <AddSiteModal>+ Add Site</AddSiteModal>
    </Flex>
  );
};

export default FeedbackTableHeader;
