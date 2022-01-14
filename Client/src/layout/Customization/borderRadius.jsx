import {
    Grid,
    Slider,
    Typography
} from '@mui/material';

import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// project imports
import SubCard from 'ui-component/cards/SubCard';

import { SET_BORDER_RADIUS } from 'store/Customization/actions';

// concat 'px'
function valueText(value) {
    return `${value}px`;
}

function BorderRadius() {
    
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    // state - border radius
    const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
    const handleBorderRadius = (event, newValue) => {
        setBorderRadius(newValue);
    };

    useEffect(() => {
        dispatch({ type: SET_BORDER_RADIUS, borderRadius });
    }, [dispatch, borderRadius]);

    return (
        <SubCard title="Border Radius">
            <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                <Grid item>
                    <Typography variant="h6" color="secondary">
                        4px
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Slider
                        size="small"
                        value={borderRadius}
                        onChange={handleBorderRadius}
                        getAriaValueText={valueText}
                        valueLabelDisplay="on"
                        aria-labelledby="discrete-slider-small-steps"
                        marks
                        step={2}
                        min={4}
                        max={24}
                        color="secondary"
                        sx={{
                            '& .MuiSlider-valueLabel': {
                                color: 'secondary.light'
                            }
                        }}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h6" color="secondary">
                        24px
                    </Typography>
                </Grid>
            </Grid>
        </SubCard>
    )
}

export default BorderRadius;