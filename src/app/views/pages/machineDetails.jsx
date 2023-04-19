import {Box, Icon, Button,styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,} from "@mui/material";
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
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const columns = [
      { field: 'machineid', headerName: 'Machine Id', width: 200, headerClassName: 'header'  },
      { field: 'machineName', headerName: 'Machine Name', width: 200, headerClassName: 'header'  },
      { field: 'building', headerName: 'building', width: 200, headerClassName: 'header'  },
      { field: 'description', headerName: 'Description', width: 200, headerClassName: 'header' },
      { field: 'action', headerName: 'Action', width: 150, headerClassName: 'header',
          renderCell: (params) => (
            <Button variant="contained" color="primary" onClick={() => rawClick(params.row.id)}>
              View
            </Button>
          ),
        },
    ];

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
      const usersRef = firebase.database().ref('machines');

      const userRefRes = usersRef.orderByChild('parentId').equalTo(user?.name ?? '')
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
      const usersRef = firebase.database().ref('machines').orderByChild('parentId').equalTo(id);;
      usersRef.on('value', (snapshot) => {
        const users = snapshot.val();
        const userList = [];

          for (let key in users) {
            if (users.hasOwnProperty(key)) {
              const row = {
                id: key,
                machineName: users[key].machineName,
                machineid: users[key].machineid,
                description: users[key].description,
              };
              userList.push(row);
            }
            }
        setUserList(userList);
      });
  }

    const rawClick = (id) => {
      fetchData(id);
    };

    const dashboardClick = (id) => {

      navigate('/charts/echarts');
    };

    const loadCurrentUserData = (id) => {
      fetchData(id);
    };

  return (
    <Container>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
     <IconButton
       color="primary"
       onClick={() => loadCurrentUserData(loggedInUser?.id)} >
       <RefreshIcon />
     </IconButton>
     </Box>
    <Box width="100%" overflow="auto"> </Box>
    <Box sx={{ height: 400, width: '100%', mb:8 }}>
    <DataGrid rows={userList} columns={columns} />
    </Box>
    </Container>
  );
};

export default MachineDetails;
