
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css'

const columns = [
  {
    field: 'expense',
    headerName: 'Expenses',
    width: 150,
  },
  {
    field: 'value',
    headerName: 'Value',
    width: 150,
  },
  {
    field: 'date',
    headerName: 'Ocurrency Date',
    width: 150,
  }
];

const initialRows = [
];

const inputStyles = {
  margin: '10px 0px'
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px', // Ajuste para uma largura de 90% para dispositivos móveis
  bgcolor: 'background.paper',
  border: '1px #000',
  boxShadow: 24,
  p: 2, // Reduzido para espaçamento mais compacto
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column'
};

function App() {

  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState();
  const [open, setOpen] = useState(false);
  const [expense, setExpense] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(dayjs());
  const [expenseInputError, setExpenseInputError] = useState(false);
  const [valueInputError, setValueInputError] = useState(false);


  const handleOpen = () => {
    setExpense('')
    setValue('')
    setDate(dayjs())
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const handleExpenseChange = (event) => {
    setExpense(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar os dados
    const isExpenseError = expense === '' ? true : false;
    setExpenseInputError(isExpenseError);

    const isValueError = value === '' ? true : false;
    setValueInputError(isValueError);

    if (isExpenseError === false && isValueError === false) {
      console.log('Despesa:', expense);
      console.log('Valor:', value);
      console.log('Date:', date.locale('pt-br').format('DD/MM/YYYY'));
      console.log('data no usestate', dayjs().locale('pt-br').format('DD/MM/YYYY'))

      const newRows = [
        ...rows,
        { id: uuid().slice(0, 8), expense: expense, value: value, date: date.locale('pt-br').format('DD/MM/YYYY')}
      ]
      setRows(newRows) 
      setOpen(false)
    }
    
  };


  const deleteExpenses = () => {
    if (selectedRows) {
      const newRows = rows.filter(row => !selectedRows.includes(row.id));
      setRows(newRows);
    }
  }

  const handleSelectedRows = (ids) => {
    setSelectedRows(ids)
  }

  return (
    <>
    <div>
      <Typography id="modal-modal-title" variant="h3" component="h1" className='mx-5 my-4'>
            Billing Planner
        </Typography>
    </div>
    <div className='mx-5'>
        <div className='my-3'>
          <Button variant="contained" onClick={handleOpen} sx={{marginRight: '10px', marginBottom: '10px'}}>Add Expense</Button>
          <Button variant="contained" onClick={deleteExpenses} sx={{marginBottom: '10px'}}>Delete Expenses</Button>
        </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Expense
          </Typography>
          <form>
            <TextField
              label="Expense"
              variant="outlined"
              value={expense}
              onChange={handleExpenseChange}
              required
              error={expenseInputError}
              sx={inputStyles}
            />
            <TextField
              label="Value"
              variant="outlined"
              value={value}
              onChange={handleValueChange}
              required
              error={valueInputError}
              sx={inputStyles}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Pick a date"
              format="DD/MM/YYYY"
              value={date}
              onChange={handleDateChange}
              sx={inputStyles}
            />
            </LocalizationProvider>
            <br />
            <Box display="flex" justifyContent="flex-end" marginX={1} marginTop={3}>
              <Button variant="contained" color="primary" onClick={handleSave} size='large'>
                Save
              </Button>
            </Box>
         </form>
        </Box>
      </Modal>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            handleSelectedRows(ids)
          }}
        />
      </Box>
    </div>
    </>
  );
}

export default App;