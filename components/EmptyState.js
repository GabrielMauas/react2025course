import React from 'react';
import { Heading, Box, Text, Button, Flex } from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
    <Flex justify="center" direction="column" align="center" gap={4} backgroundColor="white" borderRadius="8px" p={16} >
        <Heading align="center" size="lg">{"You haven't added any sites."}</Heading>
        <Text align="center" mb={4}>{"Welcome 👋🏻, let's get you started."}</Text>
        <AddSiteModal>
            Add Your First Site
        </AddSiteModal>
    </Flex>
);

export default EmptyState;