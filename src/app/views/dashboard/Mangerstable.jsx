import { Box, Icon, Button, styled, Table, } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { useState,useEffect } from "react";
import useAuth from 'app/hooks/useAuth';
import { Breadcrumb, SimpleCard } from 'app/components';
import firebase from '../../../fake-db/db/firebasekey';
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
  const [machineList, setMachineList] = useState([]);
  const [tree, setTree] = useState([]);
  const [userType, setUserType] = useState('');

  const handleNodeData = (nodeData) => {

    console.log('Selected node data:', nodeData);
    Object.keys(nodeData).forEach((id) => {
        console.log('populating node id: ', id);
        console.log('populating node: ', nodeData[id]);
         console.log('populating node sensor data: ', nodeData[id].sensor);
         let sensorData;
          Object.keys(nodeData[id].sensor).forEach((key) => {
            sensorData = nodeData[id].sensor[key];
          });
          const sensorDataJson = JSON.stringify(sensorData, (key, value) => {
            if (key === 'timestamp') {
              return undefined;
            }
            return value;
          });
          console.log('populating node sensorData data: ', sensorData.humidity);
          let newLabel = `machineNode~${id}~${sensorDataJson}`;

          const updateLabelById = (id, newLabel) => {


            function updateNodeLabelById(node, id, newLabel) {

              if (node.id === id) {
                console.log('checking for id : ' + node.id + ' value : ' + newLabel);
                node.label = newLabel; // Update the label of the node
                return;
              } else if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                  updateNodeLabelById(node.children[i], id, newLabel); // Recursively search for the node
                }
              }
            }
            updateNodeLabelById(tree, id, newLabel);

          };
          updateLabelById(id, newLabel);

      });
      console.log(tree);
      setTree(tree);
  };


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
     //console.log(tempTree + "   "+ parentId);
     const node = findNodeById(tempTree, parentId);
      //console.log(node);
       if (!node) {
         return 0;
       }
       let currentCount = Object.values(machines).filter(machine => machine.parentId === parentId).length;
      if (node.children) {
        node.children.forEach(childNode => {
         //console.log(childNode.id);
          currentCount = currentCount + getMachineCountById(machines, childNode.id, tempTree);
        });
      }
      return currentCount;
  }

    function getOwnMachineCountById(machines, parentId) {
        return Object.values(machines).filter(machine => machine.parentId === parentId).length;
    }

function prepareTree(hierarchy, tempTree) {
  return new Promise((resolve, reject) => {
    const usersRef = firebase.database().ref('users');

    const userRefRes = usersRef.orderByChild('email').equalTo(user?.name ?? '');
    userRefRes.on('value', (snapshot) => {
      const userData = snapshot.val();
      if (userData === null) {
        reject(new Error('User data is null'));
        return;
      }

      const keys = Object.keys(userData);
      const firstKey = keys[0];

      const temp = userData[firstKey];
      temp.id = firstKey;
      setLoggedInUser(temp);

      const machinesRef = firebase.database().ref('machines');
      machinesRef.once('value')
        .then((snapshot) => {
          const machines = snapshot.val();
          setMachineList(machines);

          usersRef.once('value')
            .then((snapshot) => {
              const users = snapshot.val();
              const userObj = {};
              Object.keys(users).forEach((key) => {
                userObj[key] = users[key];
              });

              const buildTree = (parentId, nodeData) => {
              //console.log( nodeData);
                const children = Object.keys(userObj)
                  .filter((key) => userObj[key].parentId === parentId)
                  .map((key) => {
                    const { firstName, lastName, userType } = userObj[key];
                    let machineCount;
                    if (hierarchy) {
                      machineCount = getMachineCountById(machines, key, tempTree);
                    } else {
                      machineCount = getOwnMachineCountById(machines, key);
                    }

                    let currentMachines = [];
                    if (userType === 'Technical Incharge') {
                      currentMachines = Object.keys(machines)
                        .filter((mId) => machines[mId].parentId === key)
                        .map((mId2) => {
                          const { machineid, machineName,humidity } = machines[mId2];
                          return {
                            id: machineid,
                            label: `machineNode~${machineid}~${machineName}`,
                            children: [],
                          };
                        });
                    }

                    let finalChild;
                    if (userType === 'Technical Incharge') {
                      finalChild = currentMachines;
                    } else {
                      finalChild = buildTree(key, nodeData);
                    }

                    return {
                      id: key,
                      label: `userNode~${firstName}~${lastName}~${userType}~${machineCount}`,
                      children: finalChild,
                    };
                  });

                return children;
              };

              const getTreeFromNode = (nodeId,nodeData) => {
                const node = userObj[nodeId];
                if (!node) {
                  return null;
                }

                let machineCount;
                if (hierarchy) {
                  machineCount = getMachineCountById(machines, nodeId, tempTree);
                } else {
                  machineCount = getOwnMachineCountById(machines, nodeId);
                }

                return {
                  id: nodeId,
                  label: `userNode~${node.firstName}~${node.lastName}~${node.userType}~${machineCount}`,
                  children: buildTree(nodeId,nodeData),
                };
              };

              const tree = getTreeFromNode(firstKey);
              resolve(tree);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
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
                    //console.log(tree)
                    setTree(tree);
                });
            });
    }, []);


  return (
    <Container >
    <Box sx={{ height: '100%', width: '100%', mb:12 }}>
        <RecursiveTreeView data={tree} machineNodeData={handleNodeData}/>
    </Box>
    </Container>
  );
};

export default Mangerstable;
