import { 
    Box, 
    FormControl, 
    CardHeader,
    CardContent, 
    FormHelperText, 
    TextField,
    Grid,
    Modal
} from "@mui/material";

import ButtonCustom from "ui-component/button/ButtonCustom";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import { Formik } from "formik";
import *  as Yup from "yup";
import ButtonCloseModal from "themes/ButtonCloseModal";
import { ModalContext } from "contexts/monitoringContext"
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux"
import { styles } from 'ui-component/form'
import { Genres } from 'store/Genres/api'

const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Bạn cần nhập thể loại')
});

function FormCustomize({ title, isCreate }) {
    const modal = useContext(ModalContext);
    const dispatch = useDispatch();
    //Handle close modal
    const genres = useSelector((state) => state.genres);
    const handleClose = isCreate ? modal.handleCreate : modal.handleUpdate;

    return (
        <Modal
            open={isCreate ? modal.openModal.create : modal.openModal.update}
            onClose={handleClose}
            aria-labelledby="modal-modal"
            aria-describedby="modal-modal-description">
            <Box component="div" sx={{
                ...styles,
                width: '40%'
            }}>
                <ButtonCloseModal handleClose={handleClose}></ButtonCloseModal>
                <CardHeader title={isCreate ? title : modal.propData.title}></CardHeader>
                <CardContent>
                    <Box component="div">
                        <Formik
                            initialValues={{
                                name: !isCreate ? modal.propData.name : ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                                const payload = {
                                    name: values.name
                                };
                                if(!isCreate) {
                                    const genreId = modal.propData.genreId;
                                    dispatch(Genres.CreateOrUpdate(payload, genreId));
                                    return modal.handleModalUpdate();
                                }
                                else{
                                    resetForm();
                                    return dispatch(Genres.CreateOrUpdate(payload));
                                }
                            }}>

                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <Grid container >
                                    <form style={{width: `100%`}} noValidate onSubmit={handleSubmit}>
                                        <Grid item xs={12} sx={{ marginBottom: `20px` }}>
                                            <FormControl sx={{ width: `100%`}}>
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    id="outlined-adornment-name"
                                                    type="text"
                                                    value={values.name}
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Thể loại"
                                                    inputProps={{}}
                                                />
                                                {touched.name && errors.name && (
                                                    <FormHelperText error id={`standard-weight-helper-text-name`}>
                                                        {errors.name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Box component="div" sx={{justifyContent: `end`, display: 'flex'}}>
                                            <ButtonCustom
                                                loading={genres?.loading}
                                                color="info" 
                                                title={isCreate ? "Lưu lại" : "Cập nhật"}
                                                icon={<SaveAltIcon />}
                                                variant="contained"
                                                type="submit" 
                                                sx={{marginRight: `10px`}}
                                            ></ButtonCustom>
                                            <ButtonCustom
                                                handleClick={handleClose}
                                                loading={false}
                                                title="Thoát"
                                                icon={<CloseIcon />}
                                                variant="outlined"
                                            ></ButtonCustom>
                                        </Box>
                                    </form>
                                </Grid>
                            )}
                        </Formik>
                    </Box>
                </CardContent>
            </Box>
        </Modal>
    )
}
export default FormCustomize;