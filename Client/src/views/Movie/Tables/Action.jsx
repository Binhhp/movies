import { Stack } from "@mui/material";
import React from "react";
import DeleteAction from "./DeleteAction";
import EditAction from "./EditAction";

function TableActions({ dataIndex }){

    return (
        <Stack direction="row" spacing={2}>
            <EditAction dataIndex={dataIndex} />
            <DeleteAction dataIndex={dataIndex} />
        </Stack>
    )
}

export default TableActions;