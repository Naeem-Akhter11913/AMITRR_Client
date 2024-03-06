import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { jwtDecode } from 'jwt-decode';
import { paginationScore } from '../store/action/action';
import { formateDate } from '../utils/dateFormate';

export default function Records() {
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [ignoreDiacritics, setIgnoreDiacritics] = useState(true);
  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  const dispatch = useDispatch();
  const { data, scoreSaveError, scoreSaveSucc, pagDataErr, pagDataSucc, length } = useSelector(d => d.imtrrReducer);



  useEffect(() => {
    const obj = {
      page,
      pageSize
    }
    dispatch(paginationScore(obj))
  }, [scoreSaveError, scoreSaveSucc, pagDataErr, pagDataSucc, page, pageSize]);


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


  useEffect(() => {
    if (data && data.length > 0 && scoreSaveError || scoreSaveSucc || pagDataErr || pagDataSucc) {
      const dddd = data.map((d, i) => (
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
  }, [data, scoreSaveError, scoreSaveSucc, pagDataErr, pagDataSucc, length])


  const handlePageChange = (e) => {
    setPage(e.page + 1)
    setPageSize(e.pageSize)
  }


  return (
    <Box sx={{ height: 400, width: '100%' }}
      style={{ boxShadow: "0px 1px 37px -2px rgba(0,0,0,0.75)", borderRadius: "10px", padding: "10px" }}
    >
      <DataGrid
        rows={pageData}
        columns={columns}
        rowCount={length}
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
        onPaginationModelChange={handlePageChange}
        disableRowSelectionOnClick
        paginationMode="server"
        pageSizeOptions={[5, 10, 20]}
        disableColumnSelector
        disableDensitySelector

        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        ignoreDiacritics={ignoreDiacritics}
      />
    </Box>
  );
}