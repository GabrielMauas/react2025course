import React from 'react';
import { Heading, Box, Text, Button, Flex } from '@chakra-ui/react';

import DashboardShell from './DashboardShell';

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Flex justify="center" direction="column" align="center" gap={4} backgroundColor="white" borderRadius="8px" p={16} >
      <Heading align="center" size="md">Get feedback on your site instantly.</Heading>
      <Text align="center" mb={4}>Start today, then grow with us 🌱</Text>
      <Button backgroundColor="black" color="white" _hover={{color:'black', bgColor:"gray.200"}} _active={{transform: "scale(0.96)"}} _focus={{border: "none"}} fontWeight={600}>Upgrade to Starter</Button>
    </Flex>
  </DashboardShell>
);

export default FreePlanEmptyState;