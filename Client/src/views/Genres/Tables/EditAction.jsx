import ButtonCustom from "ui-component/button/ButtonCustom"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useSelector } from "react-redux";
import { ModalContext } from "contexts/monitoringContext"
import { useContext } from "react";

function EditAction({ dataIndex }){
    const modal = useContext(ModalContext);

    const genres = useSelector(state => state.genres);
    const handleClick = () => {
        modal.handleUpdate();
        const genreCurrent = genres?.body[dataIndex];
        return modal.setPropData({
            name: genreCurrent.name,
            genreId: genreCurrent.id,
            title: `Cập nhật ${genreCurrent.name}`
        })
    }

    return (
        <ButtonCustom
            handleClick={handleClick}
            loading={false}
            icon={<ModeEditOutlineIcon />}
            title="Edit"
            color="primary" />
    )
}
export default EditAction;