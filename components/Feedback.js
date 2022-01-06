import { Box, Heading, Text, Divider } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt }) => {

    return (
        <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius={4} maxW="700px" w="full" my={2} >
            <Heading size="sm" mb={0} fontWeight="medium" >
                {author}
            </Heading>
            <Text color="gray.500" mb={4} fontSize="xs" >
                {format(parseISO(createdAt), 'PPp')}
            </Text>
            <Text color="gray.800" >
                {text}
            </Text>
            {/* <Divider borderColor="gray.200" /> */}
        </Box>

    )
}

export default Feedback;