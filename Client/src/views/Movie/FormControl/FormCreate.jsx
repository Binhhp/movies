import { 
    Box, 
    FormControl, 
    CardContent, 
    FormHelperText, 
    TextField,
    Grid,
    FormLabel
} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import ButtonCustom from "ui-component/button/ButtonCustom";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";
import { Formik } from "formik";
import *  as Yup from "yup";
import MainCard from "ui-component/cards/MainCard";
import Breadcrumbs from "ui-component/extended/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "./FieldContract/FileUpload";
import { Link } from "react-router-dom";
import { Movie } from "store/Movie/api";
import Loader from "ui-component/Loader";
import convertTime from 'utils/handleTime';
import ComboboxGenres from "./FieldContract/ComboboxGenres";
import ComboboxCast from "./FieldContract/ComboboxCast";
import ComboboxCompany from "./FieldContract/ComboboxCompany";

const fields = {
    title: "",
    description: "",
    dateRelease: "",
    sources: ""
}

const validationSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Nhập tiêu đề phim'),
    description: Yup.string().max(4000).required('Nhập mô tả phim'),
    sources: Yup.string().max(1000).required('Nhập link phim api')
});



function FormCreate() {

    const [dateRelease, setDateRelease] = useState({
        value: convertTime(Date.now()),
        label: new Date(Date.now())
    });
    const handleChangeDateRelease = (newDate) => {
        const date = convertTime(newDate);
        setDateRelease({
            value: date,
            label: newDate
        });
    }

    const dispatch = useDispatch();

    const [tabPoster, setTabPoster] = useState("2");
    const handleChangeTabPoster = (event, newValue) => setTabPoster(newValue);

    const [tabBackDrop, setTabBackDrop] = useState("2");
    const handleChangeTabBackDrop = (event, newValue) => setTabBackDrop(newValue);

    const [genres, setGenres] = useState('');
    const [genreSelected, setGenreSelected] = useState('');

    const [companies, setCompanies] = useState('');
    const [companySelected, setCompanySelected] = useState('');
    
    const [casts, setCasts] = useState('');
    const [castSelected, setCastSelected] = useState('');

    const handleSubmitForm = (values) => {
        const payload = new FormData();
        payload.append('Title', values.title);
        payload.append('Description', values.description);
        payload.append('DateRelease', dateRelease.value);
        payload.append('Genres', genres);
        payload.append('Companies', companies);
        payload.append('Casts', casts);
        payload.append('Sources', values.sources);

        const poster = document.getElementById('poster')?.files[0] ?? "";
        if(poster) payload.append('Poster', poster);
        const posterLink = document.getElementById('poster-link')?.value ?? "";
        if(posterLink) payload.append('PosterLink', posterLink);
        const backDrop = document.getElementById('backDrop')?.files[0] ?? "";
        if(backDrop) payload.append('BackDrop', backDrop);
        const backDropLink = document.getElementById('backDrop-link')?.value ?? ""; 
        if(backDropLink) payload.append('BackDropLink', backDropLink);
        
        return dispatch(Movie.CreateOrUpdate(payload));
    }

    const refreshForm = () => {
        document.getElementById('poster-link').value = "";
        document.getElementById('backDrop-link').value = "";
        if(document.getElementById('poster')?.value) document.getElementById('poster').value = "";
        if(document.getElementById('backDrop')?.value) document.getElementById('backDrop').value = "";
        setDateRelease(new Date());
        setGenres('');
        setGenreSelected('');
        setCompanies('');
        setCompanySelected('');
        setCasts('');
        setCastSelected('');
    }

    const creator = useSelector(state => state.movieCreate);

    return (
        <React.Fragment>
            {creator?.loading && <Loader />}
            <MainCard title="Tạo mới phim">
                <Breadcrumbs 
                    titleBottom={true}
                    title={true} 
                    rightAlign={true} 
                    icon={true} >    
                </Breadcrumbs>
                <Box component="div">
                    <CardContent>
                        <Box component="div">
                            <Formik
                                initialValues={fields}
                                validationSchema={validationSchema}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                                    handleSubmitForm(values);
                                    resetForm();
                                    refreshForm();
                                    return;
                                }}>

                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <Grid container >
                                        <form style={{width: `100%`}} noValidate onSubmit={handleSubmit}>
                                            <Box component="div" sx={{position: 'absolute', top: `-52px`, right: `50px`, display: 'flex'}}>
                                                <ButtonCustom
                                                    sx={{marginRight: '10px'}}
                                                    loading={creator?.loading}
                                                    color="info" 
                                                    title="Lưu lại"
                                                    icon={<SaveAltIcon />}
                                                    variant="contained"
                                                    type="submit" 
                                                ></ButtonCustom>
                                                <ButtonCustom
                                                    component={Link}
                                                    to="/movies"
                                                    loading={false}
                                                    title="Quay lại"
                                                    icon={<CloseIcon />}
                                                    variant="outlined"
                                                ></ButtonCustom>
                                            </Box>
                                            <Box component="div" sx={{display: 'flex', marginBottom: '25px'}}>
                                                <Grid item xs={6} sx={{ marginRight: `10px` }}>
                                                    <FormLabel className="label">Têu đề phim</FormLabel>
                                                    <FormControl sx={{ width: `100%`, marginTop: '10px'}}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            id="outlined-adornment-title"
                                                            type="text"
                                                            value={values.title}
                                                            name="title"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Tiêu đề phim"
                                                            inputProps={{}}
                                                        />
                                                        {touched.title && errors.title && (
                                                            <FormHelperText error id={`standard-weight-helper-text-title`}>
                                                                {errors.title}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormLabel className="label">Thể loại</FormLabel>
                                                    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                        <ComboboxGenres 
                                                            isCreate={true}
                                                            setGenres={setGenres}
                                                            genreSelected={genreSelected}
                                                            setGenreSelected={setGenreSelected}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Box>
                                            <Box component="div" sx={{display: 'flex', marginBottom: '25px'}}>
                                                <Grid item xs={6} sx={{marginRight: '15px'}}>
                                                    <FormLabel className="label">Diễn viên</FormLabel>
                                                    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                        <ComboboxCast
                                                            isCreate={true}
                                                            castSelected={castSelected}
                                                            setCastSelected={setCastSelected}
                                                            setCasts={setCasts}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormLabel className="label">Công ty</FormLabel>
                                                    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                        <ComboboxCompany 
                                                            isCreate={true}
                                                            companySelected={companySelected}
                                                            setCompanySelected={setCompanySelected}
                                                            setCompanies={setCompanies}/>
                                                    </FormControl>
                                                </Grid>
                                            </Box>
                                            
                                            <Box component="div" sx={{display: 'flex', marginBottom: '25px'}}>
                                                <Grid item xs={6} sx={{ marginRight: `10px` }}>
                                                    <FormLabel className="label">Link phim API (id,episodeId)</FormLabel>
                                                    <FormControl sx={{ width: `100%`, marginTop: '10px'}}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            id="outlined-adornment-sources"
                                                            type="text"
                                                            value={values.sources}
                                                            name="sources"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Link phim"
                                                            inputProps={{}}
                                                        />
                                                        {touched.sources && errors.sources && (
                                                            <FormHelperText error id={`standard-weight-helper-text-sources`}>
                                                                {errors.sources}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormLabel className="label">Ngày công chiếu</FormLabel>
                                                    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <DesktopDatePicker
                                                                label="Ngày công chiếu"
                                                                value={dateRelease.label}
                                                                inputFormat="dd/MM/yyyy"
                                                                onChange={handleChangeDateRelease}
                                                                renderInput={(params) => <TextField name="dateRelease" {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </Grid>
                                            </Box>
                                            <Box component="div" style={{display: 'flex', flexDirection: 'row', marginBottom: '25px'}}>
                                                <Grid item xs={6} sx={{marginRight: `15px`}}>
                                                    <TabContext value={tabPoster}>
                                                        <FormLabel className="label">
                                                            Poster phim
                                                            <Box component="div">
                                                                <TabList onChange={handleChangeTabPoster} sx={{minHeight: 'auto'}}>
                                                                    <Tab label="file" value="1" sx={{p: 0}}/>
                                                                    <Tab label="link" value="2" sx={{p: 0}}/>
                                                                </TabList>
                                                            </Box>
                                                        </FormLabel>
                                                        <TabPanel value="1" sx={{p: 0}}>
                                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                                <FileUpload name="poster"/>
                                                                {touched.poster && errors.poster && (
                                                                    <FormHelperText error id={`standard-weight-helper-text-poster`}>
                                                                        {errors.poster}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </TabPanel>
                                                        <TabPanel value="2" sx={{p: 0}}>
                                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    id="poster-link"
                                                                    type="text"
                                                                    value={values.poster}
                                                                    name="poster"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Poster phim"
                                                                    inputProps={{}}
                                                                />
                                                                {touched.poster && errors.poster && (
                                                                    <FormHelperText error id={`standard-weight-helper-text-poster-link`}>
                                                                        {errors.poster}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </TabPanel>
                                                    </TabContext>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TabContext value={tabBackDrop}>
                                                        <FormLabel className="label">
                                                            Ảnh nền phim
                                                            <Box component="div">
                                                                <TabList onChange={handleChangeTabBackDrop} sx={{minHeight: 'auto'}}>
                                                                    <Tab label="file" value="1" sx={{p: 0}}/>
                                                                    <Tab label="link" value="2" sx={{p: 0}}/>
                                                                </TabList>
                                                            </Box>
                                                        </FormLabel>
                                                        <TabPanel value="1" sx={{p: 0}}>
                                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                                <FileUpload name="backDrop"/>
                                                                {touched.backDrop && errors.backDrop && (
                                                                    <FormHelperText error id={`standard-weight-helper-text-backDrop`}>
                                                                        {errors.backDrop}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </TabPanel>
                                                        <TabPanel value="2" sx={{p: 0}}>
                                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    id="backDrop-link"
                                                                    type="text"
                                                                    value={values.backDrop}
                                                                    name="backDrop"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Ảnh nền phim"
                                                                    inputProps={{}}
                                                                />
                                                                {touched.backDrop && errors.backDrop && (
                                                                    <FormHelperText error id={`standard-weight-helper-text-backDrop-link`}>
                                                                        {errors.backDrop}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </TabPanel>
                                                    </TabContext>
                                                </Grid>
                                            </Box>
                                            <Grid item xs={12} sx={{marginBottom: `25px`}}>
                                                <FormLabel className="label">Mô tả phim</FormLabel>
                                                <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        id="outlined-adornment-title"
                                                        type="text"
                                                        value={values.description}
                                                        name="description"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Mô tả phim"
                                                        inputProps={{}} />
                                                    {touched.description && errors.description && (
                                                        <FormHelperText error id={`standard-weight-helper-text-title`}>
                                                            {errors.description}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </form>
                                    </Grid>
                                )}
                            </Formik>
                        </Box>
                    </CardContent>
                </Box>
            </MainCard>
        </React.Fragment>
    )
}
export default FormCreate;