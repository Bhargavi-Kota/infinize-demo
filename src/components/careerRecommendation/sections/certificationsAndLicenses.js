import React from 'react';
import {Box, Button, IconButton, Typography} from '@mui/material';
import {TextInput, DateFieldComponent} from '@/components/common/form';
import {InfinizeIcon} from '@/components/common';

export function CertificationsAndLicenses({onUpdate, formData}) {
    const certificationsAndLicenses = formData?.certificationsAndLicenses ?? [
        {}
    ];

    const handleFieldChange = (index, field, value) => {
        const updatedCourses = [...(certificationsAndLicenses || [])];
        updatedCourses[index] = {...updatedCourses[index], [field]: value};

        onUpdate({certificationsAndLicenses: updatedCourses});
    };

    const handleAdd = () => {
        const updatedCourses = [...(certificationsAndLicenses || []), {}];
        onUpdate({certificationsAndLicenses: updatedCourses});
    };

    const handleRemove = index => {
        const updatedCourses = certificationsAndLicenses.filter(
            (_, idx) => idx !== index
        );
        onUpdate({certificationsAndLicenses: updatedCourses});
    };

    return (
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography
                fontSize="16px"
                fontWeight="500"
                gutterBottom
                mb={1}
                color="primary.main"
            >
                Certifications & Licenses
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {certificationsAndLicenses?.map((Positions, index) => (
                    <Box className="border" p={3} key={index}>
                        <Box
                            display="grid"
                            gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                            gap={3}
                        >
                            <Box>
                                <Typography
                                    fontSize="16px"
                                    fontWeight="500"
                                    gutterBottom
                                    mb={1}
                                >
                                    Certification Name
                                </Typography>
                                <TextInput
                                    name={`certificationName${index}`}
                                    label="Certification Name"
                                    value={Positions.certificationName}
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'certificationName',
                                            val
                                        )
                                    }
                                />
                            </Box>
                            <Box>
                                <Typography
                                    fontSize="16px"
                                    fontWeight="500"
                                    gutterBottom
                                    mb={1}
                                >
                                    Issued By
                                </Typography>
                                <TextInput
                                    name={`company${index}`}
                                    label="Company/Organization"
                                    value={Positions.company}
                                    onChange={val =>
                                        handleFieldChange(index, 'company', val)
                                    }
                                />
                            </Box>
                            <Box>
                                <Typography
                                    fontSize="16px"
                                    fontWeight="500"
                                    gutterBottom
                                    mb={1}
                                >
                                    Issue Date
                                </Typography>
                                <DateFieldComponent
                                    name={`issueDate${index}`}
                                    label="Issue Date"
                                    value={Positions.issueDate}
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'issueDate',
                                            val
                                        )
                                    }
                                />
                            </Box>
                            <Box>
                                <Typography
                                    fontSize="16px"
                                    fontWeight="500"
                                    gutterBottom
                                    mb={1}
                                >
                                    Expiration Date
                                </Typography>

                                <DateFieldComponent
                                    name={`expirationDate${index}`}
                                    label="Expiration Date"
                                    value={Positions.expirationDate}
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'expirationDate',
                                            val
                                        )
                                    }
                                />
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="start"
                            alignItems="start"
                            mt={1}
                        >
                            {certificationsAndLicenses?.length > 1 && (
                                <Box
                                    display="flex"
                                    justifyContent="start"
                                    alignItems="start"
                                    border={'1px solid #5A6876'}
                                    width={'fit-content'}
                                    mt={1}
                                >
                                    <IconButton
                                        onClick={() => handleRemove(index)}
                                    >
                                        <InfinizeIcon
                                            icon={'fluent:delete-24-filled'}
                                        />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Button
                variant="outlined"
                onClick={handleAdd}
                sx={{alignSelf: 'start', textTransform: 'none'}}
            >
                <InfinizeIcon icon={'tabler:plus'} width={18} height={18} />
                Add
            </Button>
        </Box>
    );
}
