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
import { Cast } from 'store/Cast/api';
import FormCreate from './FormControl/FormCreate';
import FormUpdate from './FormControl/FormUpdate';

function CastFeature() {
    const casts = useSelector(state => state.casts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Cast.Get())
    }, [dispatch])
    
    return(
        <React.Fragment>
            {(casts?.loading) && <Loader />}
            <MainCard title="Quản lý diễn viên">
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
                        loading={casts?.loading}
                        columns={columnTable(casts.body)} 
                        title="Danh sách các diễn viên" 
                        dataTable={casts?.body ?? []}/>
                    <FormCreate />
                    <FormUpdate />
                </ModalContextProvider>
            </MainCard>
        </React.Fragment>
    )
}

export default CastFeature;