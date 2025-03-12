'use client';
import styles from './popup.module.css';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton
} from '@mui/material';
import {InfinizeIcon} from '.';
export default function ReusablePopup({
    open,
    onClose,
    heading,
    text,
    inputLabel,
    inputValue,
    onInputChange,
    selectLabel,
    dropdownOptions = [],
    dropdownValue,
    onDropdownChange,
    radioLabel,
    radioOptions = [],
    radioValue,
    onRadioChange,
    buttonText,
    onButtonClick
}) {
    const isButtonDisabled =
        (inputLabel && !inputValue) ||
        (dropdownOptions.length > 0 && !dropdownValue) ||
        (radioOptions.length > 0 && !radioValue);
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className={styles.infinize__dialogBox}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    minWidth: '400px'
                }
            }}
        >
            <DialogTitle
                color="primary"
                className={styles.infinize__dialogBoxHeading}
            >
                {heading}
                <IconButton onClick={onClose}>
                    <InfinizeIcon
                        icon="basil-cross-solid"
                        style={{
                            color: 'black',
                            cursor: 'pointer'
                        }}
                    />
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles.infinize__dialogBoxContent}>
                <Typography
                    variant="body1"
                    className={styles.infinize__dialogBoxText}
                >
                    {text}
                </Typography>
                {inputLabel && (
                    <TextField
                        // label={inputLabel}
                        value={inputValue}
                        onChange={onInputChange}
                        className={styles.infinize__dialogBoxInput}
                    />
                )}
                {dropdownOptions.length > 0 && (
                    <FormControl fullWidth sx={{mb: 2}}>
                        <InputLabel>{selectLabel}</InputLabel>
                        <Select
                            value={dropdownValue}
                            onChange={onDropdownChange}
                            label="Select Option"
                        >
                            {dropdownOptions.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                {radioOptions.length > 0 && (
                    <FormControl component="fieldset" sx={{mb: 2}}>
                        <Typography variant="body2" sx={{mb: 1}}>
                            {radioLabel}
                        </Typography>
                        <RadioGroup
                            value={radioValue}
                            onChange={onRadioChange}
                            row
                        >
                            {radioOptions.map((option, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
            </DialogContent>
            <DialogActions className={styles.infinize__dialogBoxActions}>
                <Button
                    variant="contained"
                    onClick={onButtonClick}
                    disabled={isButtonDisabled}
                    sx={{
                        '&.Mui-disabled': {
                            backgroundColor: '#f0f0f0',
                            color: '#aaa',
                            cursor: 'not-allowed'
                        }
                    }}
                >
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
