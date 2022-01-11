import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const SiteTableHeader = () => {
  return (
    <Flex mb={4} direction="row" justify="space-between" align="center">
      <Box>
        <Breadcrumb color="gray.700">
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem></BreadcrumbItem>
        </Breadcrumb>
        <Heading fontWeight="800" size="xl">
          My Sites
        </Heading>
      </Box>
      <AddSiteModal>+ Add Site</AddSiteModal>
    </Flex>
  );
};

export default SiteTableHeader;
