const options = (customTableOptions, handleRemoveSelected, optionParams = {}) => {
    return {
        filterType: 'multiselect',
        responsive: 'standard',
        selectableRows: 'multiple',
        selectableRowsOnClick: false,
        selectableRowsHideCheckboxes: customTableOptions.selectableRowsHideCheckboxes,
        resizableColumns: customTableOptions.resizableColumns,
        ...optionParams,
        onRowsDelete: (rowsDeleted, newData) => {
            const dataIndexs = JSON.parse(JSON.stringify(rowsDeleted.data, ["dataIndex"]));
            handleRemoveSelected(dataIndexs);
        },
        setFilterChipProps: (colIndex, colName, data) => {
            //console.log(colIndex, colName, data);
            return {
                color: 'primary',
                variant: 'outlined',
                className: 'testClass123',
            };
        }
    }
};
export {options};