import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';

function LoadingTable(){
    return (
        <Box component="div" sx={{margin: '40px 0'}}>
            <CircularProgress />
        </Box>
    )
}
export default LoadingTable;