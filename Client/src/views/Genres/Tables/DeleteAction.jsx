import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import React from "react";
import ButtonCustom from "ui-component/button/ButtonCustom";
import { useDispatch, useSelector } from "react-redux"
import { Genres } from 'store/Genres/api';

function DeleteAction({ dataIndex }) {
    const genres = useSelector((state) => state.genres);
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
                const genreId = genres?.body[dataIndex]['id'];
                return dispatch(Genres.Delete(genreId));
            }
        })
    }

    return(
        <ButtonCustom
            loading={false}
            icon={<DeleteIcon />}
            title="Delete"
            color="error"
            handleClick={handleRemove} />
    )
}

export default DeleteAction;