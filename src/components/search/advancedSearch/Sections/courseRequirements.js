import {Box, Typography} from '@mui/material';
import {NumberField} from '@/components/common/form';
import OptionalCourses from './optionalCourse';
import RequiredCourses from './requiredCourse';
import {courseRequirementsLabels} from './labels';
courseRequirementsLabels;
export default function CourseRequirements({onUpdate, formData, filterChips}) {
    const handleChange = (field, value) => {
        const updatedState = {...formData.courseRequirements, [field]: value};

        onUpdate({courseRequirements: updatedState});
        filterChips(prev => ({
            ...prev,
            courseRequirements: {
                ...prev.courseRequirements,
                [field]: courseRequirementsLabels?.[field] || field
            }
        }));
    };

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <RequiredCourses
                formData={formData}
                onUpdate={onUpdate}
                filterChips={filterChips}
            />

            <Box borderTop={1} borderColor="grey.300">
                <OptionalCourses
                    formData={formData}
                    onUpdate={onUpdate}
                    filterChips={filterChips}
                />
            </Box>

            <Box width={'25%'}>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Total Minimum Credits
                </Typography>
                <NumberField
                    name="totalMinimumCredits"
                    label="Total Minimum Credits"
                    placeholder={'Min'}
                    value={formData.courseRequirements?.totalMinimumCredits}
                    onChange={value =>
                        handleChange('totalMinimumCredits', value)
                    }
                />
            </Box>
        </Box>
    );
}
