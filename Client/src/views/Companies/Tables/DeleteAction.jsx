import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import React from "react";
import ButtonCustom from "ui-component/button/ButtonCustom";
import { useDispatch, useSelector } from "react-redux"
import { Companies } from 'store/Company/api';

function DeleteAction({ dataIndex }) {
    const companies = useSelector((state) => state.companies);
    const dispatch = useDispatch();

    const handleRemove = () => {
        return Swal.fire({
            title: 'Xóa!',
            text: 'Bạn có muốn tiếp tục xóa không?',
            icon: 'question',
            confirmButtonText: 'Xóa luôn',
            cancelButtonText: 'Thoát',
            showCancelButton: true
          }).then(async (result) => {
            if(result.isConfirmed) {
                const companyId = companies?.body[dataIndex]['id'];
                return dispatch(Companies.Delete(companyId));
            }
        })
    }

    return(
        <ButtonCustom
            loading={false}
            icon={<DeleteIcon />}
            title="Xóa"
            color="error"
            handleClick={handleRemove} />
    )
}

export default DeleteAction;