import {
  Box,
  Icon,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import useAuth from 'app/hooks/useAuth';
import { Breadcrumb, SimpleCard } from 'app/components';
import firebase from '../../../fake-db/db/firebasekey';
import { DataGrid } from "@mui/x-data-grid";
    import RecursiveTreeView from '../pages/RecursiveTreeView';

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



const Mangerstable = () => {
  const { logout, user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const [tree, setTree] = useState([]);

//   const columns = [
//       { field: 'id', headerName: 'Id', width: 200, headerClassName: 'header'  },
//       { field: 'firstName', headerName: 'First Name', width: 200, headerClassName: 'header'  },
//       { field: 'email', headerName: 'Email', width: 200, headerClassName: 'header'  },
//       { field: 'userType', headerName: 'User Type', width: 200, headerClassName: 'header' },
//       {
//           field: 'action',
//           headerName: 'Action',
//           width: 150,
//           headerClassName: 'header',
//           renderCell: (params) => (
//             <Button variant="contained" color="primary" onClick={() => rawClick(params.row.id)}>
//               View
//             </Button>
//           ),
//         },
//     ];

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
      const usersRef = firebase.database().ref('users');

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

       // Prepare tree data
       usersRef.once('value').then((snapshot) => {
         const users = snapshot.val();
          // Create an object with all the users
           const userObj = {};
           Object.keys(users).forEach((key) => {
             userObj[key] = users[key];
           });

           // Create a tree structure using the parent-child references
           const buildTree = (parentId) => {
             const children = Object.keys(userObj)
               .filter((key) => userObj[key].parentId === parentId)
               .map((key) => {
                 const { firstName, lastName } = userObj[key];
                 return {
                   id: key,
                   label: `${firstName} ${lastName}`,
                   children: buildTree(key),
                 };
               });
             return children;
           };

           // Get the tree from a specific node ID
           const getTreeFromNode = (nodeId) => {
             const node = userObj[nodeId];
             if (!node) {
               return null; // Node not found
             }
             return {
               id: nodeId,
               label: `${node.firstName} ${node.lastName}`,
               children: buildTree(nodeId),
             };
           };

           // Example usage: get the tree from node "-NSdkVWsY7LUrp88Gf0v"
           const tree = getTreeFromNode(firstKey);
           setTree(tree);
       }).catch((error) => {
         console.error(error);
       });

       });

  }, []);

  function fetchData(id) {
      const usersRef = firebase.database().ref('users').orderByChild('parentId').equalTo(id);;
      usersRef.on('value', (snapshot) => {
        const users = snapshot.val();
        const userList = [];

          for (let key in users) {
            if (users.hasOwnProperty(key)) {
              const row = {
                id: key,
                firstName: users[key].firstName,
                email: users[key].email,
                userType: users[key].userType,
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

      navigate('/pages/machineDetails/?id='+ id);
    };

    const loadCurrentUserData = (id) => {
      fetchData(id);
    };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container >
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
     <Button
       variant="contained"
       color="primary"
       onClick={() => loadCurrentUserData(loggedInUser?.id)}
       startIcon={<RefreshIcon />}
       sx={{ mr: 2 }}>
       Refresh
     </Button>
     </Box>
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">User Type</TableCell>
            <TableCell align="center">View details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => (
              <TableRow key={index}>
                <TableCell align="left">{user.id}</TableCell>
                <TableCell align="center">{user.firstName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.userType}</TableCell>
                <TableCell align="center">
                  { user.userType !== 'Technical Incharge' ? (<Button type="submit" color="primary" variant="contained" onClick={() => rawClick(user.id)}
                    sx={{ mb: 2, mt: 3 }} >
                    View Reportees
                  </Button> ) :
                  (<Button type="submit" color="secondary" variant="contained" onClick={() => dashboardClick(user.id)}
                    sx={{ mb: 2, mt: 3 }} >
                    View Machines
                  </Button>) }
                </TableCell>
              </TableRow>
            ))}
        </TableBody>

      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={userList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
    <Box sx={{ height: 400, width: '100%', mb:8 }}>
{/*     <DataGrid rows={userList} columns={columns} /> */}
        <RecursiveTreeView data={tree} />
    </Box>
    </Container>
  );
};

export default Mangerstable;
