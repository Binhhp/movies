import { FormControlLabel, Grid, Switch } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import { useContext } from "react";
import { TableContext } from "contexts/customTableOptionsContext";

function TableOptions(){

    const customTableOptions = useContext(TableContext);
    
    return (
        <SubCard title="Table Options">
            <Grid item xs={12} container spacing={2} alignItems="center">
                <Grid container sx={{ paddingLeft: `20px` }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={customTableOptions.resizableColumns}
                                onChange={e => customTableOptions.setResizableColumns(e.target.checked)}
                                value="denseTable"
                                color="primary">
                            </Switch>
                        }
                        sx={{ mb: 2 }}
                        label="Resizable Columns">
                    </FormControlLabel>  
                    <FormControlLabel
                        control={
                            <Switch
                                checked={customTableOptions.selectableRowsHideCheckboxes}
                                onChange={e => customTableOptions.setSelectableRowsHideCheckboxes(e.target.checked)}
                                value="denseTable"
                                color="primary">
                            </Switch>
                        }
                        label="Hide Checkboxes">
                    </FormControlLabel> 
                </Grid>
            </Grid>
        </SubCard>
    )
}

export default TableOptions;