import Head from 'next/head'
// import Image from 'next/image'
import { useAuth } from '@/lib/auth';

import { Button, Container, Heading, Text, Box, Image, Icon } from '@chakra-ui/react';

export default function Home() {
  const { currentUser, signInWithGithub, logOut } = useAuth();

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Container centerContent maxW="70%" pt="10">
        <Heading fontWeight="bold" fontSize="6xl" mb="10" >
          Fast Feedback
        </Heading>
        <Icon viewBox='0 0 46 32' color="black" w="48px" h="48px" mb={2} >
          <path
            d="M19.557.113C11.34.32 9.117 8.757 9.03 12.95c1.643-2.67 4.62-3.08 6.931-3.08 2.825.085 10.27.205 17.458 0C40.61 9.663 44.802 3.28 46 .112c-5.391-.085-18.228-.205-26.443 0zM14.422 14.234C3.332 14.234-.468 24.76.045 31.948c3.594-6.418 7.617-7.53 9.243-7.445h6.675c5.956 0 11.039-6.846 12.836-10.27H14.422z"
            fill="currentColor"
          />
        </Icon>

        {
          currentUser
          ? <>
              <Text fontSize='xl' mb="5"><strong>Current User: </strong>{currentUser ? currentUser.email : null }</Text>
              <Button colorScheme="red" onClick={ (e) => logOut() }>Log Out</Button>
            </>
          :
            <>
              <Button backgroundColor="black" color="white" my="2" onClick={ (e) => signInWithGithub() }>Sign In With GitHub</Button>
              {/* <button onClick={ (e) => signInWithGoogle() }>Sign In With Google</button>
              <br /> */}
            </>
        }
      </Container>
    </div>
  )
}
