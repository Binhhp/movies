import ButtonCustom from "ui-component/button/ButtonCustom"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useSelector } from "react-redux";
import { ModalContext } from "contexts/monitoringContext"
import { useContext } from "react";

function EditAction({ dataIndex }){
    const modal = useContext(ModalContext);

    const casts = useSelector(state => state.casts);
    const handleClick = () => {
        modal.handleUpdate();
        const castCurrent = casts?.body[dataIndex];
        return modal.setPropData({
            name: castCurrent.name,
            castId: castCurrent.id,
            biography: castCurrent.biography,
            title: `Cập nhật diễn viên ${castCurrent.name}`
        })
    }

    return (
        <ButtonCustom
            handleClick={handleClick}
            loading={false}
            icon={<ModeEditOutlineIcon />}
            title="Sửa"
            color="primary" />
    )
}
export default EditAction;