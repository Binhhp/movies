import { 
    Box, 
    FormControl, 
    CardHeader, 
    CardContent, 
    FormHelperText, 
    Modal, 
    TextField 
} from "@mui/material";
import ButtonCloseModal from "themes/ButtonCloseModal";
import ButtonCustom from "ui-component/button/ButtonCustom";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useContext } from "react";
import { ModalContext } from "contexts/monitoringContext"
import { Formik } from "formik";
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';

export const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `70%`,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};
//config: {fields, validationSchema, inputs: [{key, sx, title, type}],}}
const FormRequirement = forwardRef(({ 
    config, 
    formStyle, 
    sx = styles, 
    open, 
    setOpen, 
    title,
    isSave, isExit,
    children,
    handleSubmitForm }, ref) => {
    
    const modal = useContext(ModalContext);
    //Handle close modal
    const handleClose = () => modal.setModal(!modal.openModal)
    const handleCustomClose = () => setOpen(!open);
    const handleCloseModal = open !== undefined ? handleCustomClose : handleClose;
    
    const isOpenModal = open !== undefined ? open : modal.openModal;
    const theme = useTheme();

    return (
        <Modal
            open={isOpenModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description" ref={ref}>
            <Box sx={sx}>
                <ButtonCloseModal handleClose={handleCloseModal}></ButtonCloseModal>
                <CardHeader title={title}></CardHeader>
                <CardContent>
                    <Box component="div">
                        <Formik
                            initialValues={config.fields}
                            validationSchema={config.validationSchema}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                handleSubmitForm(values)
                            }}
                            >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form style={formStyle} noValidate onSubmit={handleSubmit}>
                                    {
                                        config.inputs.map(item => (
                                            <FormControl sx={item.sx}>
                                                <TextField
                                                    sx={{ ...theme.typography.customInput }}
                                                    fullWidth
                                                    id="outlined-adornment-title-login"
                                                    type={item.type}
                                                    value={values[item.key]}
                                                    name="title"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label={item.title}
                                                    inputProps={{}}
                                                />
                                                {touched[item.key] && errors[item.key] && (
                                                    <FormHelperText error id={`standard-weight-helper-text-${item.key}`}>
                                                        {errors[item.key]}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        ))
                                    }
                                    {children}
                                    <FormControl sx={{justifyContent: `end`, width: `100%`}}>
                                        {isSave && 
                                        <ButtonCustom
                                            loading={false}
                                            color="info" 
                                            title="Lưu lại"
                                            icon={<SaveAltIcon />}
                                            variant="contained"
                                            type="submit" 
                                        ></ButtonCustom>}
                                        {isExit && 
                                        <ButtonCustom
                                            handleClick={handleClose}
                                            loading={false}
                                            title="Thoát"
                                            icon={<CloseIcon />}
                                            variant="outlined"
                                        ></ButtonCustom>}
                                    </FormControl>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </CardContent>
                
            </Box>
        </Modal>
    )
})

FormRequirement.propTypes = {
    config: PropTypes.object, 
    formStyle: PropTypes.string, 
    sx: PropTypes.object, 
    open: PropTypes.bool, 
    setOpen: PropTypes.func,  
    title: PropTypes.string,
    isSave: PropTypes.bool,
    isExit: PropTypes.bool,
    handleSubmitForm: PropTypes.func 
};

export default FormRequirement;