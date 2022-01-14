import ButtonCustom from "ui-component/button/ButtonCustom"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useSelector } from "react-redux";
import { ModalContext } from "contexts/monitoringContext"
import { useContext } from "react";
import countries from "utils/countries";

function EditAction({ dataIndex }){
    const modal = useContext(ModalContext);

    const companies = useSelector(state => state.companies);
    const handleClick = () => {
        modal.handleUpdate();
        const companyCurrent = companies?.body[dataIndex];
        const country = countries.filter(x => x.label === companyCurrent.country)[0];
        return modal.setPropData({
            ...companyCurrent,
            country: country,
            companyId: companyCurrent.id,
            title: `Cập nhật công ty ${companyCurrent.name}`
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