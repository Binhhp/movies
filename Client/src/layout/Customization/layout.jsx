import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
//theme
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { SET_LAYOUT } from 'store/Customization/actions';
import { useSelector } from 'react-redux';

function Layout() {
    const customization = useSelector((state) => state.customization);
    const [layoutTheme, setLayoutTheme] = useState(customization.layout);

    const theme = useTheme();
    const dispatch = useDispatch();
    const handleChangeLayout = (layout) => {
        setLayoutTheme(layout);
        dispatch({ type: SET_LAYOUT, layout: layout });
    }

    return (
        <SubCard title="Layout">
            <FormControl>
                <RadioGroup
                    aria-label="font-family"
                    value={layoutTheme}
                    onChange={(e) => handleChangeLayout(e.target.value)}
                    name="row-radio-buttons-group"
                    sx={{display: 'flex', flexDirection: 'row'}}>
                    <FormControlLabel
                        value="light"
                        control={<Radio />}
                        label="Light"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    />
                    <FormControlLabel
                        value="dark"
                        control={<Radio />}
                        label="Dark"
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

export default Layout;