import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Companies } from "store/Company/api";
import Combobox from "./Combobox";
import { useSelector } from "react-redux";

function ComboboxCompany({ setCompanies, companySelected, setCompanySelected, isCreate }){
    const dispatch = useDispatch();
    const movieInfo = useSelector(state => state.movieInfo);

    useEffect(() => {
        dispatch(Companies.Get())
    }, [dispatch])

    return (
        <Combobox 
            isCreate={isCreate}
            defaultValue={movieInfo?.body?.companies}
            selected={companySelected}
            setSelected={setCompanySelected}
            setValue={setCompanies} 
            reducerKey="companies" 
            placeholder="Công ty" 
            labelCustom="logo"/>
    )
}
    

export default ComboboxCompany;