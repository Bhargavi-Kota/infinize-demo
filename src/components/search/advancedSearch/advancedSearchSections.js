'use client';
import React from 'react';
import {Box} from '@mui/material';
import VisualAccordion from '../advancedSearch/accordion';
import {
    AreaOfStudy,
    AssignedTo,
    CourseData,
    Performance,
    RegistrationHistory,
    StudentInfo,
    SystemActivity,
    TestScore,
    CourseRequirements
} from './Sections';

export default function AdvancedSearchSections({
    expanded,
    handleAccordionChange,
    updateSectionData,
    formData,
    filterChips,
    chips
}) {
    return (
        <Box
            height={'100vh'}
            sx={{padding: '0px 24px 24px 24px', overflowY: 'auto'}}
        >
            <VisualAccordion
                title="Student Info"
                expanded={!!expanded['studentInfo']}
                onChange={handleAccordionChange('studentInfo')}
                formData={formData.studentInfo}
                chips={chips.studentInfo}
            >
                <StudentInfo
                    sectionName="studentInfo"
                    onUpdate={updateSectionData}
                    formData={formData}
                    filterChips={filterChips}
                />
            </VisualAccordion>

            <VisualAccordion
                title="System Activity"
                expanded={!!expanded['systemActivity']}
                onChange={handleAccordionChange('systemActivity')}
                formData={formData.systemActivity}
                chips={chips.systemActivity}
            >
                <SystemActivity
                    sectionName="systemActivity"
                    onUpdate={updateSectionData}
                    formData={formData}
                    filterChips={filterChips}
                />
            </VisualAccordion>

            <VisualAccordion
                title="Registration History"
                expanded={!!expanded['registrationHistory']}
                onChange={handleAccordionChange('registrationHistory')}
                formData={formData.registrationHistory}
                chips={chips.registrationHistory}
            >
                <RegistrationHistory
                    sectionName="registrationHistory"
                    onUpdate={updateSectionData}
                    formData={formData}
                    filterChips={filterChips}
                />
            </VisualAccordion>

            <VisualAccordion
                title="Area of Study"
                expanded={!!expanded['areaOfStudy']}
                onChange={handleAccordionChange('areaOfStudy')}
                formData={formData.areaOfStudy}
                chips={chips.areaOfStudy}
            >
                <AreaOfStudy
                    sectionName="areaOfStudy"
                    onUpdate={updateSectionData}
                    formData={formData}
                    filterChips={filterChips}
                />
            </VisualAccordion>

            <VisualAccordion
                title="Performance"
                expanded={!!expanded['performance']}
                onChange={handleAccordionChange('performance')}
                formData={formData.performance}
                chips={chips.performance}
            >
                <Performance
                    sectionName="performance"
                    onUpdate={updateSectionData}
                    formData={formData}
                    filterChips={filterChips}
                />
            </VisualAccordion>

            <VisualAccordion
                title="Assigned To"
                expanded={!!expanded['assignedTo']}
                onChange={handleAccordionChange('assignedTo')}
                formData={formData.assignedTo}
                chips={chips.assignedTo}
            >
                <AssignedTo
                    sectionName="assignedTo"
                    onUpdate={updateSectionData}
                    formData={formData}
                    filterChips={filterChips}
                />
            </VisualAccordion>

            <VisualAccordion
                title="Course Data"
                expanded={!!expanded['courseData']}
                onChange={handleAccordionChange('courseData')}
                formData={formData.courseData}
                chips={chips.courseData}
            >
                <CourseData
                    sectionName="courseData"
                    onUpdate={updateSectionData}
                    formData={formData}
                    filterChips={filterChips}
                />
            </VisualAccordion>

            <VisualAccordion
                title="Course Requirements"
                expanded={!!expanded['courseRequirements']}
                onChange={handleAccordionChange('courseRequirements')}
                formData={formData.courseRequirements}
                chips={chips.courseRequirements}
            >
                <CourseRequirements
                    sectionName="courseRequirements"
                    onUpdate={updateSectionData}
                    formData={formData}
                    filterChips={filterChips}
                />
            </VisualAccordion>

            <VisualAccordion
                title="Test Scores"
                expanded={!!expanded['testScores']}
                onChange={handleAccordionChange('testScores')}
                formData={formData.testScores}
                chips={chips.testScores}
            >
                <TestScore
                    sectionName="testScores"
                    onUpdate={updateSectionData}
                    formData={formData}
                    filterChips={filterChips}
                />
            </VisualAccordion>
        </Box>
    );
}
