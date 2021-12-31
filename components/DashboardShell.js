import React from 'react'
import {
  Flex,
  Stack,
  Link,
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button
} from '@chakra-ui/react'
import { LogoIcon } from '@/styles/theme';
import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';

const DashboardShell = ({ children }) => {

    const { currentUser, logOut } = useAuth();

    return (

        <Flex flexDirection="column" backgroundColor="gray.100" w="100%" h="100%" >
        <Flex justifyContent="space-between" backgroundColor="white" py={2} px={6}>
            <Stack
            spacing={6}
            isInline
            justifyContent="center"
            alignItems="center"
            p={2}
            >
            
                <Link href="/">
                    <LogoIcon />
                </Link>
                <Link>Sites</Link>
                <Link>Feedback</Link>
            </Stack>
            <Stack spacing={6} isInline alignItems="center" justifyContent="center">
            {currentUser ? <Link color="red.400" onClick={() => logOut()}>Log Out</Link> : null}         
            <Avatar src={currentUser?.photoUrl} />
            </Stack>
        </Flex>
        <Stack
            spacing={2}
            justifyContent="space-between"
            p={8}
            maxW="900px"
            w="100%"
            mx="auto"
        >
            <Flex mb={4} direction="row" justify="space-between" align="center" >
                <Box>
                    <Breadcrumb color="gray.700">
                        <BreadcrumbItem>
                            <BreadcrumbLink>Sites</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                        
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Heading fontWeight="800" size="xl" >My Sites</Heading>
                </Box>
                <AddSiteModal>
                    + Add Site
                </AddSiteModal>
            </Flex>
            {children}
        </Stack>
        </Flex>
    )
}

export default DashboardShell