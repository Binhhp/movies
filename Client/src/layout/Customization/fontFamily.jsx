import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    useTheme
} from '@mui/material';

import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { SET_FONT_FAMILY } from 'store/Customization/actions';

import SubCard from 'ui-component/cards/SubCard';

function FontFamily() {

    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    // state - font family
    const [fontFamily, setFontFamily] = useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
    }, [dispatch, fontFamily]);

    return (
    <SubCard title="Font Family">
        <FormControl>
            <RadioGroup
                aria-label="font-family"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                name="row-radio-buttons-group"
            >
                <FormControlLabel
                    value="Roboto"
                    control={<Radio />}
                    label="Roboto"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                    }}
                />
                <FormControlLabel
                    value="Poppins"
                    control={<Radio />}
                    label="Poppins"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                    }}
                />
                <FormControlLabel
                    value="Inter"
                    control={<Radio />}
                    label="Inter"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                    }}
                />
            </RadioGroup>
        </FormControl>
    </SubCard>
    )
}

export default FontFamily;