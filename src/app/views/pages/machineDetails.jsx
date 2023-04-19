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

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 10, paddingRight: 10, backgroundColor: "#6082B6", color: "#ffffff", textAlign: "center" } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));



const MachineDetails = () => {
  const { logout, user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [machineList, setmachineList] = useState([]);
  const navigate = useNavigate();

  const columns = [
      { field: 'machineid', headerName: 'Machine Id', width: 200, headerClassName: 'header'  },
      { field: 'machineName', headerName: 'Machine Name', width: 200, headerClassName: 'header'  },
      { field: 'building', headerName: 'building', width: 200, headerClassName: 'header'  },
      { field: 'floor', headerName: 'Floor', width: 200, headerClassName: 'header'  },
      { field: 'area', headerName: 'Area', width: 200, headerClassName: 'header'  },
      { field: 'position', headerName: 'Position', width: 200, headerClassName: 'header'  },
      { field: 'parentId', headerName: 'Parent Id', width: 200, headerClassName: 'header'  },
      { field: 'note', headerName: 'Note', width: 200, headerClassName: 'header'  },
      { field: 'description', headerName: 'Description', width: 200, headerClassName: 'header' },
      { field: 'action', headerName: 'Dashboard', width: 150, headerClassName: 'header',
          renderCell: (params) => (
            <Button variant="contained" color="primary" onClick={() => rawClick(params.row.id)}>
              View </Button> ), },
      { field: 'delete', headerName: 'Delete', width: 150, headerClassName: 'header',
                renderCell: (params) => (
                  <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => deleteRow(params.row.id)}>
                           Delete  </Button> ),}
    ];

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
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
        <Button
          variant="contained" color="primary"
          onClick={() => loadCurrentUserData(loggedInUser?.id)} startIcon={<RefreshIcon />}
          sx={{ mr: 2 }} > Refresh
        </Button>
        <Button
          variant="contained" color="primary"
          onClick={() => AddMachine()}
          startIcon={<AddIcon />} > Add Machine
        </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%', mb: 8 }}>
        <DataGrid rows={machineList} columns={columns} />
      </Box>
    </Container>

  );
};

export default MachineDetails;
