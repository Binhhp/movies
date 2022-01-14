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
import { Companies } from 'store/Company/api';
import FormCreate from './FormControl/FormCreate';
import FormUpdate from './FormControl/FormUpdate';

function CompanyFeature() {
    const companies = useSelector(state => state.companies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Companies.Get())
    }, [dispatch])
    
    return(
        <React.Fragment>
            {(companies?.loading) && <Loader />}
            <MainCard title="Quản lý các công ty sản xuất phim">
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
                    <Tables 
                        loading={companies?.loading}
                        columns={columnTable(companies.body)} 
                        title="Danh sách các công ty" 
                        dataTable={companies?.body ?? []}/>
                    <FormCreate />
                    <FormUpdate />
                </ModalContextProvider>
            </MainCard>
        </React.Fragment>
    )
}

export default CompanyFeature;