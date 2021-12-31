import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'
import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/styles/theme';
import { Button, Flex, Text, Stack } from '@chakra-ui/react';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const { currentUser, signInWithGithub, logOut } = useAuth();

  return (
    <>
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Flex w="100%" align="center" justify="center" direction="column" h="100vh" >
        <LogoIcon />
        {
          currentUser
          ? <>
              {/* <EmptyState /> */}
              <Stack spacing={4} p="10">
                <Text fontSize='xl' mb="4"><strong>Current User: </strong>{currentUser ? currentUser.email : null }</Text>
                <Button colorScheme="red" variant="ghost" onClick={ (e) => logOut() }>Log Out</Button>
                <Button variant="ghost" colorScheme="gray">
                  <Link href="/dashboard">Go to dashboard</Link>
                </Button>
              </Stack>
  
            </>
          :
            <>
              <Button backgroundColor="black" variant="ghost" color="white" mt={4} onClick={ (e) => signInWithGithub() }>Sign In With GitHub</Button>
              {/* <button onClick={ (e) => signInWithGoogle() }>Sign In With Google</button>
              <br /> */}
            </>
        }
      </Flex>
    </>
  )
}
