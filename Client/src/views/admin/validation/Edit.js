import { Button, Checkbox, Flex, FormLabel, Grid, GridItem, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react'
import Spinner from 'components/spinner/Spinner'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { HSeparator } from 'components/separator/Separator'



const Edit = (props) => {
    const { onClose, isOpen } = props;
    const [isLoding, setIsLoding] = useState(false)

    const initialValues = {
        name: "",
        label: "",
        type: "",
        delete: false,
        validate: false,
        validation: [
            {
                require: false,
                message: "",
            },
            {
                min: false,
                value: "",
                message: "",
            },
            {
                max: false,
                value: "",
                message: "",
            },
            {
                match: false,
                value: "",
                message: "",
            },
            {
                types: false,
                formikType: '',
                message: "",
            },
        ],
    };

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: addFiledSchema,
        validate: (values) => {
            const errors = {};

            if (values?.validation && values.validation[0]?.require && !values.validation[0]?.message) {
                errors.validation = errors.validation || [];
                errors.validation[0] = errors.validation[0] || {};
                errors.validation[0].message = 'Message is required';
            }
            if (values?.validation && values.validation[1]?.min && !values.validation[1]?.value) {
                errors.validation = errors.validation || [];
                errors.validation[1] = errors.validation[1] || {};
                errors.validation[1].value = 'Value is required';
            }
            if (values?.validation && values.validation[2]?.max && !values.validation[2]?.value) {
                errors.validation = errors.validation || [];
                errors.validation[2] = errors.validation[2] || {};
                errors.validation[2].value = 'Value is required';
            }
            if (values?.validation && values.validation[3]?.match && !values.validation[3]?.value && !values.validation[3]?.message) {
                errors.validation = errors.validation || [];
                errors.validation[3] = errors.validation[3] || {};
                errors.validation[3].value = 'Value is required';
                errors.validation[3].message = 'Meassage is required';
            }
            if (values?.validation && values.validation[4]?.types && !values.validation[4]?.formikType) {
                errors.validation = errors.validation || [];
                errors.validation[4] = errors.validation[4] || {};
                errors.validation[4].formikType = 'FormikType is required';
            }
            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            // fetchAddData()
            resetForm()
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = formik
    return (
        <div>
            <Modal onClose={onClose} isOpen={isOpen} isCentered size='2xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit </ModalHeader>
                    <ModalCloseButton />
                    <HSeparator />
                    <ModalBody>
                        <>
                            <Grid templateColumns="repeat(12, 1fr)" gap={3}>
                                <GridItem colSpan={{ base: 12, sm: 6 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Name
                                    </FormLabel>
                                    <Input
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.name}
                                        name="name"
                                        placeholder='Enter Name'
                                        fontWeight='500'
                                        borderColor={errors.name && touched.name ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors.name && touched.name && errors.name}</Text>
                                </GridItem>

                                <GridItem colSpan={{ base: 12 }}>
                                    <Flex >
                                        <FormLabel display='flex' ms='4px' fontSize='lg' fontWeight='600' mb="0">
                                            Validations
                                        </FormLabel>
                                    </Flex>
                                </GridItem>

                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" me="10px"
                                            onChange={(e) => setFieldValue(`validation[${0}].require`, e.target.checked)}
                                        />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Require
                                        </FormLabel>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, md: 8 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values?.validation[0]?.require === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values?.validation[0]?.message}
                                        name={`validation[${0}].message`}
                                        placeholder='Enter message'
                                        fontWeight='500'
                                        borderColor={errors?.validation && touched?.validation && errors?.validation[0]?.message && touched?.validation[0]?.message ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validation && touched?.validation && touched?.validation[0]?.message && errors?.validation[0]?.message}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" name={`validation[${1}].min`} me="10px" onChange={(e) => setFieldValue(`validation[${1}].min`, e.target.checked)} />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Min
                                        </FormLabel>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Value
                                    </FormLabel>
                                    <Input
                                        disabled={values.validation[1].min === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validation[1].value}
                                        name={`validation[${1}].value`}
                                        placeholder='Enter Min Value'
                                        fontWeight='500'
                                        borderColor={errors?.validation && touched?.validation && errors?.validation[1]?.value && touched?.validation[1]?.value ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validation && touched?.validation && touched?.validation[1]?.value && errors?.validation[1]?.value}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values.validation[1].min === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validation[1].message}
                                        name={`validation[${1}].message`}
                                        placeholder='Enter Min message'
                                        fontWeight='500'
                                    // borderColor={errors.`validation[${1}].message` && touched.validation[1].message ? "red.300" : null}
                                    />
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" me="10px" name={`validation[${2}].max`} onChange={(e) => setFieldValue(`validation[${2}].max`, e.target.checked)} />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Max
                                        </FormLabel>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Value
                                    </FormLabel>
                                    <Input
                                        disabled={values.validation[2].max === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validation[2].value}
                                        name={`validation[${2}].value`}
                                        placeholder='Enter Max Value'
                                        fontWeight='500'
                                        borderColor={errors?.validation && touched?.validation && errors?.validation[2]?.value && touched?.validation[2]?.value ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validation && touched?.validation && touched?.validation[2]?.value && errors?.validation[2]?.value}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values.validation[2].max === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validation[2].massage}
                                        name={`validation[${2}].message`}
                                        placeholder='Enter Max Message'
                                        fontWeight='500'
                                        borderColor={errors.massage && touched.massage ? "red.300" : null}
                                    />
                                </GridItem>

                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" me="10px" name={`validation[${3}].match`} onChange={(e) => setFieldValue(`validation[${3}].match`, e.target.checked)} />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Match
                                        </FormLabel>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Value
                                    </FormLabel>
                                    <Input
                                        disabled={values.validation[3].match === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validation[3].value}
                                        name={`validation[${3}].value`}
                                        placeholder='Enter Max Value'
                                        fontWeight='500'
                                        borderColor={errors?.validation && touched?.validation && errors?.validation[3]?.value && touched?.validation[3]?.value ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validation && touched?.validation && touched?.validation[3]?.value && errors?.validation[3]?.value}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values.validation[3].match === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validation[3].massage}
                                        name={`validation[${3}].message`}
                                        placeholder='Enter Match Message'
                                        fontWeight='500'
                                        borderColor={errors?.validation && touched?.validation && errors?.validation[3]?.message && touched?.validation[3]?.message ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validation && touched?.validation && touched?.validation[3]?.message && errors?.validation[3]?.message}</Text>
                                </GridItem>

                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }} mt={8}>
                                    <Flex>
                                        <Checkbox colorScheme="brandScheme" name={`validation[${4}].types`} me="10px" onChange={(e) => setFieldValue(`validation[${4}].types`, e.target.checked)} />
                                        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb="0">
                                            Formik Type
                                        </FormLabel>
                                    </Flex>
                                </GridItem>

                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        FormikType
                                    </FormLabel>
                                    <Select
                                        disabled={values?.validation[4]?.types === true ? false : true}
                                        value={values.validation[4].formikType}
                                        name={`validation[${4}].formikType`}
                                        onChange={handleChange}
                                        fontWeight='500'
                                        placeholder={'Select Type'}
                                        borderColor={errors?.validation && touched?.validation && errors?.validation[4]?.formikType && touched?.validation[4]?.formikType ? "red.300" : null}
                                    >
                                        <option value='string'>String </option>
                                        <option value='number'>Number </option>
                                        <option value='boolean'>Boolean </option>
                                        <option value='date'>Date </option>
                                        <option value='object'>Object </option>
                                        <option value='array'>Array </option>
                                        <option value='mixed'>Mixed  </option>
                                    </Select>
                                    <Text mb='10px' color={'red'}> {errors?.validation && touched?.validation && touched?.validation[4]?.formikType && errors?.validation[4]?.formikType}</Text>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, sm: 6, md: 4 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='2px'>
                                        Message
                                    </FormLabel>
                                    <Input
                                        disabled={values?.validation[4]?.types === true ? false : true}
                                        fontSize='sm'
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.validation[3].massage}
                                        name={`validation[${3}].message`}
                                        placeholder='Enter Formik Type Message'
                                        fontWeight='500'
                                        borderColor={errors?.validation && touched?.validation && errors?.validation[3]?.message && touched?.validation[3]?.message ? "red.300" : null}
                                    />
                                    <Text mb='10px' color={'red'}> {errors?.validation && touched?.validation && touched?.validation[3]?.message && errors?.validation[3]?.message}</Text>
                                </GridItem>

                            </Grid>
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" size='sm' mr={2} disabled={isLoding ? true : false} >{isLoding ? <Spinner /> : 'Update'}</Button>
                        <Button variant="outline" size='sm' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Edit
