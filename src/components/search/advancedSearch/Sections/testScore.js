import React, {useState} from 'react';
import {
    Box,
    Button,
    IconButton,
    Switch,
    FormControlLabel,
    Typography
} from '@mui/material';
import {SelectField, TextInput} from '@/components/common/form';
import {InfinizeIcon} from '@/components/common';
import courseDataOptions from '@/data/advancedSearch/testScoresOptions.json';
import {testScoresLabels} from './labels';

export default function TestScore({onUpdate, formData, filterChips}) {
    const testScore = formData?.testScore ?? [{}];

    const [useAndLogic, setUseAndLogic] = useState(false);
    const [testOptions, setTestOptions] = useState(
        courseDataOptions.test || []
    );

    const handleFieldChange = (index, field, value) => {
        const updatedCourses = [...(testScore || [])];
        updatedCourses[index] = {...updatedCourses[index], [field]: value};

        onUpdate({testScore: updatedCourses});
        filterChips(prev => ({
            ...prev,
            testScores: {
                ...prev.testScores,
                [field]: testScoresLabels?.[field] || field
            }
        }));
    };

    const handleAddTestScore = () => {
        const updatedCourses = [...(testScore || []), {}];
        onUpdate({testScore: updatedCourses});
    };

    const handleRemoveTestScore = index => {
        const updatedCourses = testScore.filter((_, idx) => idx !== index);
        onUpdate({testScore: updatedCourses});
    };

    return (
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
            {testScore?.length > 1 && (
                <Box display={'flex'} alignItems={'center'} gap={1}>
                    <Typography>All Scores </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={useAndLogic}
                                onChange={() => setUseAndLogic(prev => !prev)}
                            />
                        }
                        label={''}
                    />{' '}
                    <Typography>At least one score </Typography>
                </Box>
            )}
            <Box display="flex" flexDirection="column" gap={2}>
                {testScore?.map((test, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap={2}
                                width="100%"
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    width="100%"
                                >
                                    <Box
                                        flex={1}
                                        borderBottom="1px dotted #D8E6EC"
                                    />
                                    <Box
                                        px={2}
                                        py={1}
                                        border="1px solid"
                                        borderColor="grey.500"
                                        borderRadius={2}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        fontWeight="bold"
                                        color="grey.800"
                                        bgcolor="grey.100"
                                    >
                                        {useAndLogic ? 'OR' : 'AND'}
                                    </Box>

                                    <Box
                                        flex={1}
                                        borderBottom="1px dotted #D8E6EC"
                                    />
                                </Box>
                            </Box>
                        )}
                        <Box
                            border={1}
                            borderColor="grey.300"
                            p={2}
                            borderRadius={2}
                        >
                            <Box
                                display="grid"
                                gridTemplateColumns={{
                                    xs: '1fr',
                                    sm: '1fr 1fr 1fr auto'
                                }}
                                gap={2}
                                alignItems="center"
                            >
                                <Box>
                                    <Typography
                                        fontSize="16px"
                                        fontWeight="500"
                                        gutterBottom
                                        mb={1}
                                    >
                                        Test
                                    </Typography>
                                    <SelectField
                                        name={`test-${index}`}
                                        label="Test"
                                        value={test.test || ''}
                                        options={testOptions.map(
                                            (option, idx) => ({
                                                label: option.subject,
                                                value: option.subject,
                                                key: `subject-${option.subject}-${idx}`
                                            })
                                        )}
                                        onChange={val =>
                                            handleFieldChange(
                                                index,
                                                'test',
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
                                        Test Filter
                                    </Typography>
                                    <SelectField
                                        name={`testFilter-${index}`}
                                        label="Test Filter"
                                        value={test.testFilter || ''}
                                        options={['=', '>', '<', '>=', '<=']}
                                        onChange={val =>
                                            handleFieldChange(
                                                index,
                                                'testFilter',
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
                                        Test Score
                                    </Typography>
                                    <TextInput
                                        name={`testScore-${index}`}
                                        label="Test Score"
                                        value={test.testScore || ''}
                                        onChange={val =>
                                            handleFieldChange(
                                                index,
                                                'testScore',
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
                                {testScore?.length > 1 && (
                                    <Box
                                        display="flex"
                                        justifyContent="start"
                                        alignItems="start"
                                        border={'1px solid #5A6876'}
                                        width={'fit-content'}
                                        mt={1}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                handleRemoveTestScore(index)
                                            }
                                        >
                                            <InfinizeIcon
                                                icon={'fluent:delete-24-filled'}
                                            />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </React.Fragment>
                ))}
            </Box>
            <Button
                variant="outlined"
                onClick={handleAddTestScore}
                sx={{
                    alignSelf: 'start',
                    textTransform: 'none'
                }}
            >
                <InfinizeIcon icon={'tabler:plus'} height={18} width={18} />
                Add
            </Button>
        </Box>
    );
}
