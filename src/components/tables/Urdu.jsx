import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { jwtDecode } from 'jwt-decode';
import { formateDate } from '../../utils/dateFormate';

export default function Urdu({urd}) {
    const [pageData, setPageData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [ignoreDiacritics, setIgnoreDiacritics] = useState(true);
    const [filterModel, setFilterModel] = useState({
        items: [],
    });
    const { allData, allDataSucc, allDataErr } = useSelector(d => d.imtrrReducer);

    const columns = [
        {
            field: 'id',
            headerName: 'SL',
            type: 'text',
            width: 90
        },

        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'text',
            width: 150,
        },
        {
            field: 'Language',
            headerName: 'Language',
            type: 'string',
            width: 150,
        },
        {
            field: 'Score',
            headerName: 'Score',
            type: 'text',
            width: 150,
        },
        {
            field: 'date',
            headerName: 'date',
            type: 'text',
            width: 150,
        }
    ];

    useEffect(() =>{
        if (urd && urd.length > 0 ) {
            const dddd = urd.map((d, i) => (
              {
                id: i + 1,
                fullName: d.name,
                email: d.email,
                Language: d.testLang,
                Score: d.totalMarks,
                date: formateDate(d.createdAt)
              }
            ))
            setPageData(dddd)
            
        }
        
    },[allData, allDataSucc, allDataErr])

    // console.log("jkdsfhjk",pageData)
    return (
        <div style={{ height: 400, width: '100%' ,  boxShadow:" 0px 1px 37px -2px rgba(0,0,0,0.75)", borderRadius: "10px"}}>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={pageData}
                    columns={columns}
                    ColumnFilter
                    filterModel={filterModel}
                    page={page}
                    pageSize={pageSize}

                    onFilterModelChange={setFilterModel}

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize,
                            },
                        },
                    }}

                    // checkboxSelection
                    // onPaginationModelChange={handlePageChange}
                    disableRowSelectionOnClick
                    paginationMode="server"
                    disableColumnSelector
                    disableDensitySelector

                    slots={{ toolbar: GridToolbar }}
                    slotProps={{ toolbar: { showQuickFilter: true } }}
                    ignoreDiacritics={ignoreDiacritics}
                />
            </Box>
        </div>
    );
}