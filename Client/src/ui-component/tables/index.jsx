
import MUIDataTable from "mui-datatables";
import React, { useContext } from "react";
import { options } from "./config";
import { TableContext } from "contexts/customTableOptionsContext";
import { themeTable } from "./theme";
import { ThemeProvider } from "@mui/styles";
import Loading from "./loading";

function Tables({ title, columns, dataTable, handleRemoveSelected, optionParams, loading }) {
    const customTableOptions = useContext(TableContext);
    return (
        <ThemeProvider theme={themeTable}>
            <MUIDataTable
                className="mui-datatables"
                title={title}
                data={dataTable}
                columns={columns}
                options={{
                    ...options(customTableOptions, handleRemoveSelected, optionParams),
                    textLabels: {
                        body: {
                            noMatch: loading ? <Loading /> : "Không có dữ liệu"
                        }
                    }
                }}
            />
        </ThemeProvider>
    )
}

export default Tables;