import TableActions from "./Tables/Action";
const columnTable = (dataTable) => {
    return [
        {
            name: "avatar",
            label: "Avatar",
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    return <img style={{width: `20%`, borderRadius: `10px`}} src={dataTable[dataIndex].avatar} alt={dataTable[dataIndex].name} />;
                },
                setCellProps: () => ({ style: {
                    width: `20%`
                }})
            }
        }, 
        {
            name: "name",
            label: "Tên diễn viên",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({ style: {
                    width: `50%`
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
                    width: `30%`
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