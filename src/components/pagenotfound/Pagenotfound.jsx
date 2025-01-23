import React from 'react'
import { Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function Pagenotfound() {
  const navigate=useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgColor="gray.50"
      textAlign="center"
      p={5}
    >
      <Heading as="h1" size="4xl" color="purple.500">
        404
      </Heading>
      <Text fontSize="xl" color="gray.600" mt={2}>
        Oops! The page you're looking for cannot be found.
      </Text>
      <Button
        onClick={()=>navigate("/sign-in")}
        to="/"
        colorScheme="purple"
        size="lg"
        mt={6}
        _hover={{ bg: 'purple.400' }}
      >
        Back to Homepage
      </Button>
      {/* <Box mt={8}>
        <Image
          src="https://example.com/path/to/your-chakra-image.png" // Replace with your chakra image
          alt="Chakra"
          boxSize="200px"
        />
      </Box> */}
    </Box>
  );
}

export default Pagenotfound
