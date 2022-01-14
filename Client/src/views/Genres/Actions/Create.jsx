import ButtonCustom from "ui-component/button/ButtonCustom";
import AddIcon from '@mui/icons-material/Add';
import { ModalContext } from "contexts/monitoringContext"
import { useContext } from "react";

function Create(){
    const modal = useContext(ModalContext);

    return (
        <ButtonCustom 
            handleClick={modal.handleCreate}
            loading={false}
            color="info" 
            title="Create"
            icon={<AddIcon />} />
    )
}
export default Create;