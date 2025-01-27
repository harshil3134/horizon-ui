import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'


function Inputform({isOpen,onClose}) {


    function validatelabel(value) {
        let error
        if (!value) {
          error = "Label is required"
        } else if (value.toLowerCase() === "profile") {
          error = "It's already there"
        }
        return error
      }
      function validateicon(value)
      {
        let error
        if(!value)
        {
            error="Icon is required"
        }
        return error
      }
      function validatepath(value)
      {
        let error
        if(!value)
        {
            error="Path is requried"
        }
        return error
      }
function validatecomponent(value)
{
    let error
        if(!value)
        {
            error="Component is requried"
        }
        return error

}

  return (
<>


    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Input Form</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
    <Formik 
    
    initialValues={{  }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 1000)
    }}
  >
    {(props) => (
      <Form>
        <Field name="label" validate={validatelabel}>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.label && form.touched.label}>
              <FormLabel htmlFor="label">Label</FormLabel>
              <Input
                {...field}
                id="label"
                placeholder="label"
                borderRadius="16px"
              />
              <FormErrorMessage>{form.errors.label}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name="icon" validate={validateicon} >
            {({field,form})=>(
                <FormControl isInvalid={form.errors.icon && form.touched.icon}>
                    <FormLabel htmlFor="icon" mt={4}>Icon</FormLabel>
                    <Input
                    {...field}
                    id="icon"
                    placeholder='<svg></svg>'
                    borderRadius="16px"
                    />
                    <FormErrorMessage>{form.errors.icon}</FormErrorMessage>
                </FormControl>
            )}
        </Field>

        <Field name="path" validate={validatepath}>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.path && form.touched.path}>
              <FormLabel htmlFor="path" mt={4}>Path</FormLabel>
              <Input
                {...field}
                id="path"
                placeholder="path"
                borderRadius="16px"
              />
              <FormErrorMessage>{form.errors.path}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name="component" validate={validatecomponent}>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.component && form.touched.component}>
              <FormLabel htmlFor="component" mt={4}>Component Name</FormLabel>
              <Input
                {...field}
                id="component"
                placeholder="component"
                borderRadius="16px"
              />
              <FormErrorMessage>{form.errors.component}</FormErrorMessage>
            </FormControl>
          )}
        </Field>


        <Button
          my={5}
          colorScheme="brand"
          isLoading={props.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    )}
  </Formik>
  </ModalBody>

  </ModalContent>
  </Modal>
  </>
  )
}

export default Inputform
