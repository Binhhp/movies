import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Cast } from "store/Cast/api";
import Combobox from "./Combobox";
import { useSelector } from "react-redux";

function ComboboxCast({ setCasts, castSelected, setCastSelected, isCreate }){
    const dispatch = useDispatch();
    const movieInfo = useSelector(state => state.movieInfo);
    useEffect(() => {
        dispatch(Cast.Get())
    }, [dispatch])

    return (
        <Combobox 
            isCreate={isCreate}
            defaultValue={movieInfo?.body?.cats}
            selected={castSelected}
            setSelected={setCastSelected}
            setValue={setCasts} 
            reducerKey="casts" 
            placeholder="Diễn viên" 
            labelCustom="avatar" 
            sx={{borderRadius: '50%'}}/>
    )
}
    

export default ComboboxCast;