import React, {useState, useEffect} from 'react';
import './App.css';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CellInput from "./CellInput";

const App = () => {

    const [rowData, setRowData] = useState([{name: ""}]);

    const columnDefs = [
        {
            headerName: 'Serial No',
            width: 45,
            minWidth: 45,
            suppressMovable: true,
            cellClass: 'table-cell table-serial',
            valueGetter: (params) => (params.node.rowIndex + 1),
            pinned: 'left',
            suppressSizeToFit: true

        },
        {
            headerName: 'Name',
            field: 'name',
            cellRendererFramework:CellInput,

        }

    ]
    const defaultColDefs = {
        flex: 1
    }


    return (
        <div className="ag-theme-alpine" style={{height: 1400, width: 1600}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDefs}
            >
            </AgGridReact>
        </div>
    );
};

export default App;
