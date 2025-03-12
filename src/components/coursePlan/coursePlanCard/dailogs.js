'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import ReusablePopup from '../../common/popup';

export default function CoursePlanDialogs({
    confirmDeleteOpen,
    setConfirmDeleteOpen,
    handleDelete,
    resetPopup,
    setResetPopup,
    handleResetPopup,
    savePopup,
    setSavePopup,
    inputValue,
    setInputValue,
    handleSavePopup,
    showLimitPopup,
    setShowLimitPopup,
    handleContinue,
    courseUnavailable,
    setCourseUnavailable,
    handleCourseUnavailable,
    courseConflict,
    setCourseConflict,
    handleCourseConflict,
    lowCredits,
    setLowCredits,
    handleLowCredits
}) {
    const router = useRouter();

    const handleCancel = () => {
        router.back();
    };

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };
    const handleSaveContinue = () => {
        handleContinue();
        setSelectedOption('');
    };
    const [selectedOption, setSelectedOption] = useState('');
    const [conflictOIption, setConflictOption] = useState('');
    const [selectedUnavailable, setSelectedUnavailable] = useState('');
    const [lowCreditOption, setLowCreditOption] = useState('');
    return (
        <>
            {/* Confirm Delete Dialog */}
            <ReusablePopup
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                heading="Confirm Deletion"
                text="Are you sure you want to delete this item?"
                buttonText="Delete"
                onButtonClick={handleDelete}
            />

            {/* Reset Dialog */}
            <ReusablePopup
                open={resetPopup}
                onClose={() => setResetPopup(false)}
                heading="Confirm Reset"
                text="Are you sure you want to reset?"
                buttonText="Reset"
                onButtonClick={handleResetPopup}
            />

            {/* Save Dialog */}
            <ReusablePopup
                open={savePopup}
                onClose={() => setSavePopup(false)}
                heading="Plan Name"
                text="Enter a name to save the plan."
                buttonText="Save"
                inputLabel="Enter plan name"
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onButtonClick={handleSavePopup}
            />

            {/* Replace Paln Dialog */}
            <ReusablePopup
                open={showLimitPopup}
                onClose={() => setShowLimitPopup(false)}
                heading="Alert!"
                text="You have 3 plans already. Replace one to create a new plan."
                buttonText="Continue"
                radioLabel="Replace which plan?"
                radioOptions={[
                    {value: '1', label: 'Plan-1'},
                    {value: '2', label: 'Plan-2'},
                    {value: '3', label: 'Plan-3'}
                ]}
                radioValue={selectedOption}
                onRadioChange={e => setSelectedOption(e.target.value)}
                onButtonClick={handleSaveContinue}
            />

            {/* Course Unavailable Dialog*/}
            <ReusablePopup
                open={courseUnavailable}
                onClose={() => setCourseUnavailable(false)}
                heading="Course Unavailable"
                text="This course is not provided in Fall 2026. Pick another course or move it to a valid semester."
                buttonText="Continue"
                selectLabel="Select a semester to move this course."
                dropdownOptions={[
                    {value: '1', label: 'Plan-1'},
                    {value: '2', label: 'Plan-2'},
                    {value: '3', label: 'Plan-3'}
                ]}
                dropdownValue={selectedUnavailable}
                onDropdownChange={e => setSelectedUnavailable(e.target.value)}
                onButtonClick={handleCourseUnavailable}
            />

            {/* Course Conflict Dialog*/}
            <ReusablePopup
                open={courseConflict}
                onClose={() => setCourseConflict(false)}
                heading="Course Conflict!"
                text="This course is/has been planned for the term Summer 2025."
                buttonText="Continue"
                radioLabel="Do you want to move to Spring 2025 instead?"
                radioOptions={[
                    {value: '1', label: 'Yes'},
                    {value: '2', label: 'No'}
                ]}
                radioValue={conflictOIption}
                onRadioChange={e => setConflictOption(e.target.value)}
                onButtonClick={handleCourseConflict}
            />

            {/* Low Credits Dialog*/}
            <ReusablePopup
                open={lowCredits}
                onClose={() => setLowCredits(false)}
                heading="Low Credits Alert!"
                text="You will be 2 credits short of the recommended total for this semester."
                buttonText="Continue"
                radioLabel="Do you still want to continue?"
                radioOptions={[
                    {value: '1', label: 'Yes'},
                    {value: '2', label: 'No'}
                ]}
                radioValue={lowCreditOption}
                onRadioChange={e => setLowCreditOption(e.target.value)}
                onButtonClick={handleLowCredits}
            />
        </>
    );
}
