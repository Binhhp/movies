import ButtonCustom from "ui-component/button/ButtonCustom"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function EditAction({ dataIndex }){
    const movies = useSelector((state) => state.movie);

    return (
        <ButtonCustom
            component={Link}
            to={`/movies/${movies?.body ? movies?.body[dataIndex]?.id : ""}`}
            loading={false}
            icon={<ModeEditOutlineIcon />}
            title="Sửa"
            color="primary" />
    )
}
export default EditAction;