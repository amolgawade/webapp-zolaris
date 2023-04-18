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
import { useState,useEffect } from "react";
import useAuth from 'app/hooks/useAuth';
import firebase from '../../../fake-db/db/firebasekey';


const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
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

  useEffect(() => {
      const usersRef = firebase.database().ref('users');

      const loggedInUser = usersRef.orderByChild('email').equalTo(user?.name ?? '')
       loggedInUser.on('value', (snapshot) => {
       const userData = snapshot.val();
       if(userData === null) {
       return
       }
       const keys = Object.keys(userData);
       const firstKey = keys[0];
       fetchData(firstKey);
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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
                  <Button type="submit" color="primary" variant="contained" onClick={() => rawClick(user.id)}
                    sx={{ mb: 2, mt: 3 }} >
                    View
                  </Button>
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
  );
};

export default Mangerstable;
