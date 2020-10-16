import React, {useState} from 'react';
import './App.css';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {RowGroupingModule} from '@ag-grid-enterprise/row-grouping'

const App = () => {

    const [rowData, setRowData] = useState([
        {Year: "2021", Geography: "New zealand", Company: 'Apple', status: 'Submitted', forms: 200},
        {Year: "2021", Geography: "Singapore", Company: 'Nokia', status: 'Submitted', forms: 200},
        {Year: "2050", Geography: "China", Company: 'Samsung', status: 'Submitted', forms: 200},
        {Year: "2060", Geography: "India", Company: 'Micromax', status: 'Submitted', forms: 200},
        {Year: "2060", Geography: "Thailand", Company: 'Micromax', status: 'Submitted', forms: 200},
        {Year: "2060", Geography: "India", Company: 'Micromax', status: 'Submitted', forms: 200},
        {Year: "2060", Geography: "India", Company: 'Micromax', status: 'Submitted', forms: 200},

    ]);

    const myCustomAggFunc = (values) => {
        let geographies = new Set();
        values.forEach((value) => geographies.add(value));
        return [...geographies.values()].join(',');
    }
    const log = (params) => {
        console.log(params)
    }
    const columnDefs = [
        {
            headerName: '#',
            width: 45,
            minWidth: 45,
            suppressMovable: true,
            cellClass: 'table-cell table-serial',
            valueGetter: (params) => {
                log(params);
                return (params.node.firstChild && params.node.lastChild) || params.node.allChildrenCount ? params.node.rowIndex + 1 : String.fromCharCode(97 + params.node.childIndex)
            },
            pinned: 'left',
            suppressSizeToFit: true

        },
        {
            headerName: 'Year',
            showRowGroup: 'Year',
            cellRenderer: 'agGroupCellRenderer',
            minWidth: 200,
            valueGetter: params => params.data.Year,
        },
        {
            field: 'Year',
            rowGroup: true,
            hide: true,
            cellRenderer: 'agGroupCellRenderer',
            aggFunc: myCustomAggFunc,
            // cellRendererParams: {
            //     innerRenderer: 'groupRowInnerRenderer',
            //     //  suppressCount: true,
            // }
        },
        {
            headerName: 'Geography',
            field: 'Geography',
            aggFunc: myCustomAggFunc

        },
        {
            headerName: 'Company',
            field: 'Company',
            aggFunc: myCustomAggFunc
        },
        {
            field: 'status',
        },
        {
            field: 'forms',
            aggFunc: 'sum',
            //  cellRenderer: 'agGroupCellRenderer',
            //  enableValue:true,
            //  cellRendererParams: {
            //      innerRenderer: 'groupRowInnerRenderer',
            //      //  suppressCount: true,
            //  }
        },
    ]
    const defaultColDefs = {
        flex: 1
    }

    const rowStyling = (params) => {

        if (params.node.allChildrenCount !== null) {
            return {background: 'yellow'};
        }

    }

    const onGridReady = (params) => {
        console.log(aarams);

    }


    return (
        <div className="ag-theme-alpine" style={{height: 1400, width: 1600}}>
            <AgGridReact
                modules={[RowGroupingModule]}
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                //groupIncludeFooter={true}
                rowData={rowData}
                // groupMultiAutoColumn={true}
                suppressDragLeaveHidesColumns={true}
                // groupUseEntireRow={true}
                groupRemoveSingleChildren={true}
                //  groupSuppressBlankHeader={true}
                defaultColDef={defaultColDefs}
                animateRows={true}
                groupSuppressAutoColumn={true}
                getRowStyle={rowStyling}


            >

            </AgGridReact>
        </div>
    );
};

export default App;
