import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';
import 'react-toastify/dist/ReactToastify.css';
// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { toast, ToastContainer } from 'react-toastify';
import { TableProvider } from 'contexts/customTableOptionsContext';

// ==============================|| APP ||============================== //
toast.configure();
const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <TableProvider>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </TableProvider>
            </ThemeProvider>
            <ToastContainer 
                icon={true}
                theme='colored'
                autoClose={4000} 
                closeButton={true} 
                hideProgressBar={false} 
                position={'bottom-left'} />
        </StyledEngineProvider>
    );
};

export default App;
