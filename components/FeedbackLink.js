import { Flex, Link } from '@chakra-ui/react'


const FeedbackLink = ({ siteId }) => {
    return (
        <Flex justify="space-between" >
            <Link fontWeight="bold" fontSize="sm" href={`/p/${siteId}`} >
                Leave a comment -
            </Link>
            <Link fonstSize="xs" color="blackAlpha.500" href="/">
                Powered by Fast Feedback
            </Link>
        </Flex>
    )
}

export default FeedbackLink
