
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AsyncSelect from 'react-select'
import Options from "./ComboboxControlOption";

const styles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'red' : 'black',
        backgroundColor: 'white'
    }),
    control: (styles) => ({ ...styles, backgroundColor: '#fafafa', borderRadius: `12px` }),
    multiValueLabel: (styles) => ({
        ...styles,
        maxHeight: `30px`
    }),
};

function Combobox({ reducerKey, placeholder, labelCustom, sx, setValue, selected, setSelected, defaultValue, isCreate }) {
    
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const reducer = useSelector(state => state[reducerKey]);

    const handleChange = (selectedOptions) => {
        let values = [];
        selectedOptions.map(item => values.push(item.value));
        setSelected(selectedOptions);
        return setValue(values.toString());
    }
    useEffect(() => {
        if(reducer?.body && options?.length === 0) {
            let data = reducer.body.map((g) => {
                return { 
                    value: g.id, 
                    label: labelCustom 
                        ? <Options sx={sx} label={g.name} image={g[labelCustom]} width="30px"/>
                        : g.name 
                }
            });
            setOptions(data);
            if(!isCreate) {
                if(defaultValue){
                    setValue(defaultValue.toString());
                    return setSelected(data.filter(x => defaultValue.indexOf(x.value) !== -1));
                }
            }
        }
    }, [options, setOptions, reducer, dispatch, reducerKey, labelCustom, sx, defaultValue, setSelected, setValue, isCreate]);

    return (
        <AsyncSelect
            inputId={reducerKey}
            cacheOptions
            isClearable
            closeMenuOnSelect={true}
            isMulti
            defaultOptions={[options[0]]}
            value={selected}
            styles={styles}
            options={options}
            onChange={handleChange}
            placeholder={<div>{placeholder}</div>} />
    )
}

export default Combobox;