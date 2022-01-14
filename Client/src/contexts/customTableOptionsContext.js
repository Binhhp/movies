import React, { useState } from 'react';

const TableContext = React.createContext();

function TableProvider({ children }) {
    const [resizableColumns, setResizableColumns] = useState(false);
    const [selectableRowsHideCheckboxes, setSelectableRowsHideCheckboxes] = useState(false);
    const [search, setSearch] = useState(false);

    return (
        <TableContext.Provider value={{
            resizableColumns: resizableColumns,
            setResizableColumns: setResizableColumns,
            selectableRowsHideCheckboxes: selectableRowsHideCheckboxes,
            setSelectableRowsHideCheckboxes: setSelectableRowsHideCheckboxes,
            search: search,
            setSearch: setSearch
        }}>
            {children}
        </TableContext.Provider>
    )
}

export { TableProvider, TableContext };