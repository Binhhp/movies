import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import React from "react";
import ButtonCustom from "ui-component/button/ButtonCustom";
import { useDispatch, useSelector } from "react-redux"
import { Movie } from 'store/Movie/api';

function DeleteAction({ dataIndex }) {
    const movies = useSelector((state) => state.movie);
    const dispatch = useDispatch();

    const handleRemove = () => {
        
        Swal.fire({
            title: 'Xóa!',
            text: 'Bạn có muốn tiếp tục xóa không?',
            icon: 'question',
            confirmButtonText: 'Xóa luôn',
            cancelButtonText: 'Thoát',
            showCancelButton: true
          }).then(async (result) => {
            if(result.isConfirmed) {
                debugger
                const movieId = movies?.body[dataIndex]['id'];
                return dispatch(Movie.Delete(movieId));
            }
        })
        return;
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