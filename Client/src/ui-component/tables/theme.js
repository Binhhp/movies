import { createTheme } from '@mui/material/styles';
const themeTable = createTheme({
    overrides: {
        MUIDataTable: {
            responsiveScroll: {
                maxHeight: 'none',
                background: 'pink'
            }
        },
        MUIDataTableViewCol: {
            root: {
              paddingTop: '100px !important'
            }
        }
    }
});

export { themeTable };