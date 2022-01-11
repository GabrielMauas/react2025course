import { Flex, Stack, Link, Avatar } from '@chakra-ui/react';
import NextLink from 'next/link';

import { LogoIcon } from '@/styles/theme';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { currentUser, logOut } = useAuth();

  return (
    <Flex flexDirection="column" backgroundColor="gray.100" w="100%" h="100%">
      <Flex
        justifyContent="space-between"
        backgroundColor="white"
        py={2}
        px={6}
      >
        <Stack
          spacing={6}
          isInline
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          <NextLink href="/" passHref>
            <Link>
              <LogoIcon />
            </Link>
          </NextLink>
          <NextLink href="/sites" passHref>
            <Link>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedback</Link>
          </NextLink>
        </Stack>
        <Stack spacing={6} isInline alignItems="center" justifyContent="center">
          {currentUser ? (
            <Link color="red.400" onClick={() => logOut()}>
              Log Out
            </Link>
          ) : null}
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
        {children}
      </Stack>
    </Flex>
  );
};

export default DashboardShell;
