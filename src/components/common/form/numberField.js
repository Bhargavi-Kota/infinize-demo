import {TextField, InputAdornment, IconButton} from '@mui/material';
import {InfinizeIcon} from '../index';

export function NumberField({
    name,
    value,
    onChange,
    placeholder,
    min = 0,
    max
}) {
    const numericValue = Number(value) || '';

    const handleChange = e => {
        const newValue = e.target.value ? Number(e.target.value) : '';
        if (!isNaN(newValue) && newValue >= 0) {
            onChange(newValue);
        }
    };

    return (
        <TextField
            type="text"
            name={name}
            value={numericValue}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter"
            slotProps={{
                input: {
                    min,
                    max,
                    placeholder,
                    'aria-label': placeholder || name,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() =>
                                    onChange(Math.max(numericValue - 1, 0))
                                }
                            >
                                <InfinizeIcon
                                    icon="majesticons:minus-line"
                                    width={20}
                                    hight={20}
                                />
                            </IconButton>
                            <IconButton
                                onClick={() => onChange(numericValue + 1)}
                            >
                                <InfinizeIcon
                                    icon="tabler:plus"
                                    width={20}
                                    hight={20}
                                />
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />
    );
}
