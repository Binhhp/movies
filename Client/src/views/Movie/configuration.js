import TableActions from "./Tables/Action";
const columnMovie = (dataTable) => {
    return [
        {
            name: "poster",
            label: "Ảnh",
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    return <img style={{width: `40%`, borderRadius: `10px`}} src={dataTable[dataIndex].backdrop} alt={dataTable[dataIndex].title} />;
                },
                setCellProps: () => ({ style: {
                    width: `30%`
                }})
            }
        }, 
        {
            name: "title",
            label: "Tiêu đề",
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
                    width: `20%`
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

export { columnMovie };