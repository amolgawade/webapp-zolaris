import {Box, Icon, Button,styled, Table,} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import useAuth from 'app/hooks/useAuth';
import { Breadcrumb, SimpleCard } from 'app/components';
import firebase from '../../../fake-db/db/firebasekey';
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

// const StyledTable = styled(Table)(() => ({
//   whiteSpace: "pre",
//   "& thead": {
//     "& tr": { "& th": { paddingLeft: 10, paddingRight: 10, backgroundColor: "#6082B6", color: "#ffffff", textAlign: "center" } },
//   },
//   "& tbody": {
//     "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
//   },
// }));



const MachineDetails = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [machineList, setmachineList] = useState([]);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  const columns = [
      { field: 'machineid', headerName: 'Machine Id', width: 200, headerClassName: 'headerColor'  },
      { field: 'machineName', headerName: 'Machine Name', width: 200, headerClassName: 'headerColor'  },
      { field: 'building', headerName: 'building', width: 200, headerClassName: 'headerColor'  },
      { field: 'floor', headerName: 'Floor', width: 100, headerClassName: 'headerColor'  },
      { field: 'area', headerName: 'Area', width: 150, headerClassName: 'headerColor'  },
      { field: 'position', headerName: 'Position', width: 150, headerClassName: 'headerColor'  },
      { field: 'parentId', headerName: 'Parent Id', width: 200, headerClassName: 'headerColor'  },
      { field: 'note', headerName: 'Note', width: 200, headerClassName: 'headerColor'  },
      { field: 'description', headerName: 'Description', width: 200, headerClassName: 'headerColor' },
      { field: 'action', headerName: 'Dashboard', width: 100, headerClassName: 'headerColor',
          renderCell: (params) => (
            <Button variant="contained" color="primary" onClick={() => rawClick(params.row.id)}>
              View </Button> ), },
      { field: 'delete', headerName: 'Delete', width: 125, headerClassName: 'headerColor',
        renderCell: (params) => {
          if (loggedInUser?.id === params.row.parentId) {
            return (
              <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}
                onClick={() => {
                  const confirmDelete = window.confirm("Are you sure you want to delete the machine?");
                  if (confirmDelete) { deleteRow(params.row.id); }
                }}
              >
                Delete
              </Button>
            );
          } else {
            return (
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} disabled > Delete </Button>
            )
          }
        }
      },

    ];

  useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get('id');
      if(id !== null) {
      fetchData(id);
      } else {
      const usersRef = firebase.database().ref('users');
        console.log(user?.name);
      const userRefRes = usersRef.orderByChild('email').equalTo(user?.name ?? '')
       userRefRes.on('value', (snapshot) => {
       const userData = snapshot.val();
       if(userData === null) {
       return
       }
       const keys = Object.keys(userData);
       const firstKey = keys[0];

       const temp = userData[firstKey];
       temp.id = firstKey;
       console.log(temp);
       setLoggedInUser(temp);
       fetchData(firstKey);
       });
       }
  }, []);

  function fetchData(id) {
      const machineRef = firebase.database().ref('machines').orderByChild('parentId').equalTo(id);;
      machineRef.on('value', (snapshot) => {
        const users = snapshot.val();
        const machineList = [];

          for (let key in users) {
            if (users.hasOwnProperty(key)) {
              const row = {
                id: key,
                machineName: users[key].machineName,
                machineid: users[key].machineid,
                building: users[key].building,
                floor: users[key].floor,
                area: users[key].area,
                position: users[key].position,
                parentId: users[key].parentId,
                note: users[key].note,
                description: users[key].description,

              };
              console.log(row);
              machineList.push(row);
            }
            }
        setmachineList(machineList);
      });
  }

    const rawClick = (id) => {
      navigate('/charts/echarts');
    };

    const deleteRow = (id) => {
      const machineRef = firebase.database().ref('machines/' + id);
      machineRef.remove()
        .then(() => {
          console.log('Row deleted successfully!');
          fetchData(loggedInUser?.id);
        })
        .catch((error) => {
          console.error('Error deleting row:', error);
        });
    };

    const dashboardClick = (id) => {

      navigate('/charts/echarts');
    };

    const AddMachine = (id) => {

          navigate('/pages/machineregister/mregister');
        };

    const loadCurrentUserData = (id) => {
      fetchData(id);
    };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
{/*         <Button */}
{/*           variant="contained" color="primary" */}
{/*           onClick={() => loadCurrentUserData(loggedInUser?.id)} startIcon={<RefreshIcon />} */}
{/*           sx={{ mr: 2 }} > Refresh */}
{/*         </Button> */}
        <Button
          variant="contained" color="primary"
          onClick={() => AddMachine()}
          startIcon={<AddIcon />} > Add Machine
        </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%', mb: 8,'& .headerColor': { backgroundColor: '#232a44', color:'#ffffff'}, }}>
        <DataGrid rows={machineList} columns={columns} />
      </Box>
    </Container>

  );
};

export default MachineDetails;
