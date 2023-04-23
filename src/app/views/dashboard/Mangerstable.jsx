import { Box, Icon, Button, styled, Table, } from "@mui/material";
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

const Mangerstable = () => {
  const { logout, user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);
  const [machineList, setMachineList] = useState([]);
  const navigate = useNavigate();
  const [tree, setTree] = useState([]);
  const [userType, setUserType] = useState('');


  const columns = [
      { field: 'id', headerName: 'Id', width: 200, headerClassName: 'headerColor'  },
      { field: 'firstName', headerName: 'First Name', width: 100, headerClassName: 'headerColor'  },
      { field: 'lastName', headerName: 'Last Name', width: 100, headerClassName: 'headerColor'  },
      { field: 'email', headerName: 'Email', width: 200, headerClassName: 'headerColor'  },
      { field: 'phone', headerName: 'Phone', width: 100, headerClassName: 'headerColor'  },
      { field: 'streetAddress', headerName: 'StreetAddress', width: 200, headerClassName: 'headerColor'  },
      { field: 'streetAddressLine2', headerName: 'StreetAddressLine2', width: 200, headerClassName: 'headerColor'  },
      { field: 'country', headerName: 'Country', width: 100, headerClassName: 'headerColor'  },
      { field: 'city', headerName: 'City', width: 100, headerClassName: 'headerColor'  },
      { field: 'region', headerName: 'Region', width: 100, headerClassName: 'headerColor'  },
      { field: 'zipCode', headerName: 'Zip Code', width: 100, headerClassName: 'headerColor'  },
      { field: 'parentId', headerName: 'Parent Id', width: 200, headerClassName: 'headerColor'  },
      { field: 'userType', headerName: 'User Type', width: 150, headerClassName: 'headerColor' },
      { field: 'action', headerName: 'Action', width: 150, headerClassName: 'headerColor',
         renderCell: (params) => (
           <>
              { params.row.userType !== 'Technical Incharge' ?
              (<Button type="submit" color="primary" variant="contained" onClick={() => rawClick(params.row.id)} sx={{ mb: 2, mt: 3 }} >
                View Reportees
              </Button> ) :
              (<Button type="submit" color="secondary" variant="contained" onClick={() => dashboardClick(params.row.id)} sx={{ mb: 2, mt: 3 }} >
                View Machines
              </Button>) }
           </>
         ),
      },
    ];

  const [loggedInUser, setLoggedInUser] = useState(null);

    function findNodeById(node, id) {
      if (node.id === id) {
        return node;
      } else if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const found = findNodeById(node.children[i], id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    }

  function getMachineCountById(machines, parentId, tempTree) {
//     console.log(tempTree + "   "+ parentId);
     const node = findNodeById(tempTree, parentId);
//      console.log(node);
       if (!node) {
         return 0;
       }
       let currentCount = Object.values(machines).filter(machine => machine.parentId === parentId).length;
      if (node.children) {
        node.children.forEach(childNode => {
//         console.log(childNode.id);
          currentCount = currentCount + getMachineCountById(machines, childNode.id, tempTree);
        });
      }
      return currentCount;
  }

    function getOwnMachineCountById(machines, parentId) {
        return Object.values(machines).filter(machine => machine.parentId === parentId).length;
    }

function prepareTree(hierarchy, tempTree) {
//   if (hierarchy) {console.log(tempTree); }
  return new Promise((resolve, reject) => {
    const usersRef = firebase.database().ref('users');

    const userRefRes = usersRef.orderByChild('email').equalTo(user?.name ?? '');
    userRefRes.on('value', (snapshot) => {
      const userData = snapshot.val();
      if(userData === null) {
        reject(new Error('User data is null'));
        return;
      }

      const keys = Object.keys(userData);
      const firstKey = keys[0];

      const temp = userData[firstKey];
      temp.id = firstKey;
      setLoggedInUser(temp);
      fetchData(firstKey);

      const machinesRef = firebase.database().ref('machines');
      machinesRef.once('value').then((snapshot) => {
        const machines = snapshot.val();
        setMachineList(machines);

        usersRef.once('value').then((snapshot) => {
          const users = snapshot.val();
          const userObj = {};
          Object.keys(users).forEach((key) => {
            userObj[key] = users[key];
          });

          const buildTree = (parentId) => {
            const children = Object.keys(userObj)
              .filter((key) => userObj[key].parentId === parentId)
              .map((key) => {
                const { firstName, lastName, userType } = userObj[key];
                let machineCount;
                if(hierarchy) {
//                   console.log("passing tempTree : " +  tempTree);
                  machineCount = getMachineCountById(machines, key, tempTree);
                } else {
                  machineCount = getOwnMachineCountById(machines, key);
                }

                return {
                  id: key,
                  label: `${firstName}~${lastName}~${userType}~${machineCount}`,
                  children: buildTree(key),
                };
              });
            return children;
          };

          const getTreeFromNode = (nodeId) => {
            const node = userObj[nodeId];
            if (!node) {
              return null;
            }
            let machineCount;
            if(hierarchy) {
//             console.log("passing tempTree : " +  tempTree);
              machineCount = getMachineCountById(machines, nodeId, tempTree);
            } else {
              machineCount = getOwnMachineCountById(machines, nodeId);
            }
            return {
              id: nodeId,
              label: `${node.firstName}~${node.lastName}~${node.userType}~${machineCount}`,
              children: buildTree(nodeId),
            };
          };

          const tree = getTreeFromNode(firstKey);
          resolve(tree);
        }).catch((error) => {
          reject(error);
        });

      }).catch((error) => {
        reject(error);
      });
    });
  });
}

    useEffect(() => {
      prepareTree(false, null)
          .then((tempTree) => {
            prepareTree(true, tempTree)
              .then((tree) => {
                    setTree(tree);
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
                lastName: users[key].lastName,
                email: users[key].email,
                phone: users[key].phone,
                streetAddress: users[key].streetAddress,
                streetAddressLine2: users[key].streetAddressLine2,
                country: users[key].country,
                city: users[key].city,
                region: users[key].region,
                zipCode: users[key].zipCode,
                parentId: users[key].parentId,
                userType: users[key].userType,
              };
//               console.log(row);
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

  return (
    <Container >
     <Box sx={{ height: 400, width: '100%', mb: 8,
     '& .headerColor': { backgroundColor: '#232a44', color:'#ffffff'},
      }}>
        <DataGrid rows={userList} columns={columns} />
    </Box>
    <Box sx={{ height: '100%', width: '100%', mb:12 }}>
        <RecursiveTreeView data={tree} />
    </Box>
    </Container>
  );
};

export default Mangerstable;
