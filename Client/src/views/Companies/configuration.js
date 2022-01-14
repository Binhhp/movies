import TableActions from "./Tables/Action";
const columnTable = (dataTable) => {
    return [
        {
            name: "logo",
            label: "Logo",
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    return <img style={{width: `20%`, borderRadius: `10px`}} src={dataTable[dataIndex].logo} alt={dataTable[dataIndex].name} />;
                },
                setCellProps: () => ({ style: {
                    width: `20%`
                }})
            }
        }, 
        {
            name: "name",
            label: "Tên công ty",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({ style: {
                    width: `30%`
                }})
            }
        }, 
        {
            name: "country",
            label: "Quốc gia",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({ style: {
                    width: `20%`
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