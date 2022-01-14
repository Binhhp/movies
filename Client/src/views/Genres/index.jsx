import { Box, Grid, Stack } from '@mui/material';
import { ModalContextProvider } from 'contexts/monitoringContext';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Loader from 'ui-component/Loader';
import Tables from 'ui-component/tables';
import { columnTable } from './configuration';
import Create from './Actions/Create';
import { Genres } from 'store/Genres/api';
import FormCreate from './FormControl/FormCreate';
import FormUpdate from './FormControl/FormUpdate';

function GenreFeature() {
    const genres = useSelector(state => state.genres);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Genres.Get())
    }, [dispatch])
    
    return(
        <React.Fragment>
            {(genres?.loading) && <Loader />}
            <MainCard title="Quản lý thể loại">
                <Breadcrumbs 
                    titleBottom={true}
                    title={true} 
                    rightAlign={true} 
                    icon={true} >    
                </Breadcrumbs>
                <ModalContextProvider>
                    {/* Action Mailboxes */}
                    <Grid sx={{ marginBottom: '30px' }} container columns={12}>
                        <Stack sx={{width: '100%'}} direction="row" justifyContent="end">
                            <Box component="div">
                                <Create />
                            </Box>
                        </Stack>
                    </Grid>
                    {/* Tables Mailboxes */}
                    <Tables 
                        loading={true}
                        columns={columnTable(genres.body)} 
                        title="Danh sách các thể loại" 
                        dataTable={genres?.body ?? []}/>
                    <FormCreate />
                    <FormUpdate />
                </ModalContextProvider>
            </MainCard>
        </React.Fragment>
    )
}

export default GenreFeature;