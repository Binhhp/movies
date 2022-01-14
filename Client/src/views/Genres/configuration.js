import TableActions from "./Tables/Action";
const columnTable = () => {
    return [
        {
            name: "name",
            label: "Thể loại",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({ style: {
                    width: `60%`
                }})
            }
        }, 
        {
            name: "action",
            label: "Xử lý",
            options: {
                filter: false,
                sort: false,
                empty: true,
                setCellProps: () => ({ style: {
                    width: `40%`
                }}),
                customBodyRenderLite: (dataIndex, rowIndex) => {
                  return (
                        <TableActions dataIndex={dataIndex} />
                  );
                }
            }
        }
    ];
}

export { columnTable };