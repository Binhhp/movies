import ButtonCustom from "ui-component/button/ButtonCustom";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";

function Create(){
    return (
        <ButtonCustom 
            loading={false}
            color="info" 
            title="Tạo mới"
            icon={<AddIcon />}
            component={Link} to="/movies/create" />
    )
}
export default Create;