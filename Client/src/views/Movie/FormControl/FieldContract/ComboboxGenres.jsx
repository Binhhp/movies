import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Genres } from "store/Genres/api";
import Combobox from "./Combobox";
import { useSelector } from "react-redux";
function ComboboxGenres({ setGenres, genreSelected, setGenreSelected, isCreate }){
    const dispatch = useDispatch();
    const movieInfo = useSelector(state => state.movieInfo);

    useEffect(() => {
        dispatch(Genres.Get());
    }, [dispatch])

    return (
        <Combobox 
            isCreate={isCreate}
            defaultValue={movieInfo?.body?.genres}
            reducerKey="genres" 
            placeholder="Thể loại" 
            setValue={setGenres}
            selected={genreSelected}
            setSelected={setGenreSelected}
        />
    )
}
    

export default ComboboxGenres;