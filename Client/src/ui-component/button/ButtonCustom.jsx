import { forwardRef } from "react";
import PropTypes from 'prop-types';
import { LoadingButton } from "@mui/lab";
const ButtonMailbox = forwardRef(
    ({ loading, color, title, icon, handleClick, sx, variant, size, ...other}, ref ) => {
        return (
            <LoadingButton 
                ref={ref}
                loading={loading}
                loadingPosition="start"
                variant={variant}
                size={size ?? "small"}
                sx={sx}
                color={color} 
                startIcon={icon}
                onClick={handleClick}
                {...other}>
                {title}
            </LoadingButton>
        )
    }
)

ButtonMailbox.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.object,
    handleClick: PropTypes.func,
    value: PropTypes.string,
    sx: PropTypes.object,
    variant: PropTypes.string
}

ButtonMailbox.defaultProps = {
    variant: 'contained'
}
export default ButtonMailbox;