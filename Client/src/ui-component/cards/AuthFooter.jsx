// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://hungtm.io" target="_blank" underline="hover">
            hungtm.io
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://hungtm.tk" target="_blank" underline="hover">
            &copy; hungtm.tk
        </Typography>
    </Stack>
);

export default AuthFooter;
