import { 
    Box, 
    FormControl, 
    CardHeader,
    CardContent, 
    FormHelperText, 
    TextField,
    Grid,
    Modal,
    Autocomplete 
} from "@mui/material";

import ButtonCustom from "ui-component/button/ButtonCustom";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from "react";
import { Formik } from "formik";
import *  as Yup from "yup";
import ButtonCloseModal from "themes/ButtonCloseModal";
import { ModalContext } from "contexts/monitoringContext"
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux"
import { styles } from 'ui-component/form'
import { Companies } from 'store/Company/api'
import countries from 'utils/countries'
import { useState } from 'react';

const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Bạn cần nhập tên công ty'),
    homePage: Yup.string().max(255).required('Bạn cần nhập trang chủ công ty'),
    headQuarter: Yup.string().max(255).required('Bạn cần nhập trụ sở của công ty'),
    logo: Yup.string().max(255).required('Bạn cần chọn logo của công ty')
});

const validationSchemaUpdate = Yup.object().shape({
    name: Yup.string().max(255).required('Bạn cần nhập tên công ty'),
    homePage: Yup.string().max(255).required('Bạn cần nhập trang chủ công ty'),
    headQuarter: Yup.string().max(255).required('Bạn cần nhập trụ sở của công ty')
});

function FormCustomize({ title, isCreate }) {
    const modal = useContext(ModalContext);
    const dispatch = useDispatch();
    //Handle close modal
    const companies = useSelector((state) => state.companies);
    const handleClose = isCreate ? modal.handleCreate : modal.handleUpdate;

    const defaultValue = isCreate ? countries[0] : modal?.propData.country;
    const [valueCountry, setValueCountry] = useState(defaultValue);
    const [inputValue, setInputValue] = useState('');
    
    useEffect(() => {
        if(modal?.propData?.country){
            setValueCountry(modal.propData.country);
        }
    }, [modal])

    let initialValues = {
        name: !isCreate ? modal.propData.name : '',
        homePage: !isCreate ? modal.propData.homePage : '',
        headQuarter: !isCreate ? modal.propData.homePage : '',
        country: !isCreate ? modal.propData.country : ''
    };
    if(isCreate) initialValues['logo'] = '';
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
                                payload.append("homePage", values.homePage);
                                payload.append("headQuarter", values.headQuarter);
                                payload.append("country", inputValue);
                                if(values.logo) payload.append("logo", values.logo);
                                if(!isCreate) {
                                    const companyId = modal.propData.companyId;
                                    dispatch(Companies.CreateOrUpdate(payload, companyId));
                                    return modal.handleModalUpdate();
                                }
                                else{
                                    dispatch(Companies.CreateOrUpdate(payload));
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
                                                    label="Tên công ty"
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
                                                    id="outlined-adornment-headQuarter"
                                                    type="text"
                                                    value={values.headQuarter}
                                                    name="headQuarter"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Trụ sở chính"
                                                    inputProps={{}}
                                                />
                                                {touched.headQuarter && errors.headQuarter && (
                                                    <FormHelperText error id={`standard-weight-helper-text-headQuarter`}>
                                                        {errors.headQuarter}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Box component="div" sx={{ marginBottom: `20px`, display: 'flex' }}>
                                            <Grid item xs={6} sx={{marginRight: `10px`}}>
                                                <FormControl sx={{ width: `100%`}}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        id="outlined-adornment-homePage"
                                                        type="text"
                                                        value={values.homePage}
                                                        name="homePage"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Trang chủ công ty"
                                                        inputProps={{}}
                                                    />
                                                    {touched.homePage && errors.homePage && (
                                                        <FormHelperText error id={`standard-weight-helper-text-homePage`}>
                                                            {errors.homePage}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl sx={{ width: `100%`}}>
                                                    <Autocomplete
                                                        value={valueCountry}
                                                        onChange={(event, newValue) => setValueCountry(newValue)}
                                                        inputValue={inputValue}
                                                        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                                                        id="country-select"
                                                        size="small"
                                                        sx={{ width: `100%` }}
                                                        options={countries}
                                                        autoHighlight
                                                        getOptionLabel={(option) => option.label}
                                                        renderOption={(props, option) => (
                                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                alt=""
                                                            />
                                                            {option.label} ({option.code}) +{option.phone}
                                                            </Box>
                                                        )}
                                                        renderInput={(params) => (
                                                            <TextField
                                                            {...params}
                                                                name="country"
                                                                label="Chọn đất nước"
                                                                inputProps={{
                                                                    ...params.inputProps,
                                                                    autoComplete: 'new-password', 
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    {touched.country && errors.country && (
                                                        <FormHelperText error id={`standard-weight-helper-text-country`}>
                                                            {errors.country}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Box>
                                        <Grid item xs={12} sx={{ marginBottom: `20px` }}>
                                            <FormControl sx={{ width: `100%`}}>
                                                <input 
                                                    id="logo"
                                                    accept="image/*" 
                                                    className="file-upload"
                                                    multiple 
                                                    type="file" 
                                                    name="logo"
                                                    onChange={(event) => {
                                                        setFieldValue("logo", event.currentTarget.files[0]);
                                                    }}
                                                /> 
                                                {touched.logo && errors.logo && (
                                                    <FormHelperText error id={`standard-weight-helper-text-logo`}>
                                                        {errors.logo}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Box component="div" sx={{justifyContent: `end`, display: 'flex'}}>
                                            <ButtonCustom
                                                loading={companies?.loading}
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