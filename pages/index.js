import Head from 'next/head';
import NextLink from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/styles/theme';
import { Button, Flex, Text, Stack, Link } from '@chakra-ui/react';

export default function Home() {
  const { currentUser, signInWithGithub, signInWithGoogle, logOut } = useAuth();

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/sites"
              }
            `,
          }}
        />
        <title>Fast Feedback</title>
      </Head>

      <Flex
        w="100%"
        align="center"
        justify="center"
        direction="column"
        h="100vh"
      >
        <LogoIcon />
        {currentUser ? (
          <>
            {/* <EmptyState /> */}
            <Stack spacing={4} p="10">
              <Text fontSize="xl" mb="2">
                <strong>Current User: </strong>
                {currentUser ? currentUser.name : null}
              </Text>
              <Text fontSize="xl" mb="4">
                <strong>Provider: </strong>
                {currentUser ? currentUser.provider : null}
              </Text>
              <Button
                colorScheme="red"
                variant="ghost"
                onClick={(e) => logOut()}
              >
                Log Out
              </Button>
              <NextLink href="/sites" passHref>
                <Link textDecoration="none">
                  <Button variant="ghost" colorScheme="gray" w="100%">
                    Go to the Dashboard
                  </Button>
                </Link>
              </NextLink>
            </Stack>
          </>
        ) : (
          <>
            <Button
              backgroundColor="black"
              variant="ghost"
              color="white"
              fontWeight="medium"
              leftIcon={<FaGithub />}
              mt={4}
              size="lg"
              _hover={{ bgColor: 'gray.700', transform: 'scale(0.98)' }}
              onClick={(e) => signInWithGithub()}
            >
              Sign In With GitHub
            </Button>
            <Button
              backgroundColor="white"
              variant="outline"
              color="gray.900"
              fontWeight="medium"
              leftIcon={<FaGoogle />}
              mt={4}
              size="lg"
              _hover={{ bgColor: 'gray.300', transform: 'scale(0.98)' }}
              onClick={(e) => signInWithGoogle()}
            >
              Sign In With Google
            </Button>
          </>
        )}
      </Flex>
    </>
  );
}
