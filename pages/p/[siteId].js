import { useRef, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Link from 'next/link';

import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';
import { createFeedback } from '@/lib/db';
import Feedback from '@/components/Feedback';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: currentUser.name,
      authorId: currentUser.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: currentUser.provider,
      status: 'pending',
    };

    inputEl.current.value = '';

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      maxW="700px"
      w="full"
      margin="0 auto"
      display="flex"
      flexDirection="column"
    >
      <Stack isInline mt={4}>
        <Link href="/sites" passHref>
          <IconButton icon={<ArrowBackIcon />} fontWeight="bold" />
        </Link>
      </Stack>
      <FormControl as="form" onSubmit={onSubmit} my={8}>
        <FormLabel htmlFor="comment">Comment</FormLabel>
        <Input ref={inputEl} id="comment" type="comment" />
        <Button type="sumbit" fontWeight="medium" mt={4}>
          Add Comment
        </Button>
      </FormControl>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
