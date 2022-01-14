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
import { Cast } from 'store/Cast/api'

const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Bạn cần nhập tên diễn viên'),
    biography: Yup.string().max(255).required('Bạn cần nhập tiểu sử của diễn viên'),
    avatar: Yup.string().max(255).required('Bạn cần chọn ảnh đại diện')
});

const validationSchemaUpdate = Yup.object().shape({
    name: Yup.string().max(255).required('Bạn cần nhập tên diễn viên'),
    biography: Yup.string().max(255).required('Bạn cần nhập tiểu sử của diễn viên')
});

function FormCustomize({ title, isCreate }) {
    const modal = useContext(ModalContext);
    const dispatch = useDispatch();
    //Handle close modal
    const casts = useSelector((state) => state.casts);
    const handleClose = isCreate ? modal.handleCreate : modal.handleUpdate;

    let initialValues = {
        name: !isCreate ? modal.propData.name : '',
        biography: !isCreate ? modal.propData.biography : ''
    };
    if(isCreate) initialValues['avatar'] = '';
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
                            initialValues={initialValues}
                            validationSchema={isCreate ? validationSchema : validationSchemaUpdate}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                                let payload = new FormData();
                                payload.append("name", values.name);
                                payload.append("biography", values.biography);
                                if(values.avatar) payload.append("avatar", values.avatar);
                                if(!isCreate) {
                                    const castId = modal.propData.castId;
                                    dispatch(Cast.CreateOrUpdate(payload, castId));
                                    return modal.handleModalUpdate();
                                }
                                else{
                                    dispatch(Cast.CreateOrUpdate(payload));
                                    return resetForm();
                                }
                            }}>

                            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
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
                                                    label="Tên diễn viên"
                                                    inputProps={{}}
                                                />
                                                {touched.name && errors.name && (
                                                    <FormHelperText error id={`standard-weight-helper-text-name`}>
                                                        {errors.name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sx={{ marginBottom: `20px` }}>
                                            <FormControl sx={{ width: `100%`}}>
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    id="outlined-adornment-name"
                                                    type="text"
                                                    value={values.biography}
                                                    name="biography"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Tiểu sử"
                                                    inputProps={{}}
                                                />
                                                {touched.biography && errors.biography && (
                                                    <FormHelperText error id={`standard-weight-helper-text-biography`}>
                                                        {errors.biography}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sx={{ marginBottom: `20px` }}>
                                            <FormControl sx={{ width: `100%`}}>
                                                <input 
                                                    id="avatar"
                                                    accept="image/*" 
                                                    className="file-upload"
                                                    multiple 
                                                    type="file" 
                                                    name="avatar"
                                                    onChange={(event) => {
                                                        setFieldValue("avatar", event.currentTarget.files[0]);
                                                    }}
                                                /> 
                                                {touched.avatar && errors.avatar && (
                                                    <FormHelperText error id={`standard-weight-helper-text-avatar`}>
                                                        {errors.avatar}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Box component="div" sx={{justifyContent: `end`, display: 'flex'}}>
                                            <ButtonCustom
                                                loading={casts?.loading}
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