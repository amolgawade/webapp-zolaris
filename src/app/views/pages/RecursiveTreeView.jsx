import React from 'react';
import Icon from '@mui/material/Icon';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import firebase from '../../../fake-db/db/firebasekey';

function PlusSquare(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M12 6v12M6 12h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MinusSquare(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M6 12h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      <circle cx="12" cy="12" r="11" />
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682z" fill="#FFF" />
    </SvgIcon>
  );
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}



const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function RecursiveTreeView(props) {
  const { data, machineNodeData } = props;
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleRefresh = () => {
    setRefreshFlag((prevRefreshFlag) => !prevRefreshFlag);
  };

  const styles = {
    root: { height: '100%', flexGrow: 1, maxWidth: 400, },
    label: { fontWeight: 'bold', },
    treeItem: { '&:hover > $label': { color: 'blue', cursor: 'pointer', }, },
  };

const handleClick = (node) => {
  const currentUser = node.label?.split('~');
  console.log(currentUser);
  if (currentUser[3] === 'Technical Incharge') {
    const userId = node.id;
    console.log(`Is Technical Incharge: ${userId}`);
    const RefDb = firebase.database().ref(`UsersData/${userId}`);

    RefDb.once('value').then((snapshot) => {
      const nodeData = snapshot.val();
      //console.log('Data from UsersData:', nodeData);
      machineNodeData(nodeData);
    }).catch((error) => {
      console.error('Error reading nodeData from UsersData:', error);
    });
  } else {
    console.log("Not Technical Incharge");
  }
};


const navigate = useNavigate();
useEffect(() => {
   // Function to refresh the data
     const refreshData = () => {
       // Perform the data refresh logic here
       console.log('Refreshing data...');

       // Call the handleRefresh function after a time limit (e.g., 20 seconds)
       const timeLimit = 20000; // 20 seconds
       setTimeout(handleRefresh, timeLimit);
       };
       refreshData();
}, [data]);

const renderTree = (nodes, handleClick) => {
  const labelValues = nodes.label?.split('~');
  const nodeType = labelValues?.[0];

  let firstName;
  let lastName;
  let userType;
  let machineCount;
  let showViewMachineButton;
  if (nodeType === 'userNode') {
     firstName = labelValues?.[1];
     lastName = labelValues?.[2];
     userType = labelValues?.[3];
     machineCount = labelValues?.length > 4 ?  labelValues?.[4] : 0;
     showViewMachineButton = userType === "Technical Incharge";
  }
    let machineId;
    let machineName;
    let humidity;
  if(nodeType === 'machineNode') {
      machineId = labelValues?.[1];
     machineName = labelValues?.[2];

  }


  return (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
      <span>
      { nodeType === 'userNode' &&
       <span>
        <span style={{fontSize: '1.75rem', fontWeight: 'bold', color: userType === 'General manager' ? '#593C73' : 'black'}}>
          {userType === 'General manager' && `${firstName} ${lastName} `}
        </span>
        <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: userType === 'Regional manager' ? '#e3742f' : 'black'}}>
          {userType === 'Regional manager' && `${firstName} ${lastName} `}
        </span>
        <span style={{fontSize: '1.25rem', fontWeight: 'bold', color: userType === 'Branch manager' ? '#a250f5' : 'black'}}>
          {userType === 'Branch manager' && `${firstName} ${lastName} `}
        </span>
        <span style={{fontSize: '1rem', color: userType === 'Technical Incharge' ? '#3c8039' : 'black'}}>
          {userType === 'Technical Incharge' && `${firstName} ${lastName} `}
        </span>
        <span style={{ fontSize: '0.75rem' }}>
          ({userType}) <span style={{ fontWeight: 'bold' }}> ({"Active Machines: "}
            {machineCount} <CheckCircleOutlineRoundedIcon sx={{ color: '#2abe25', fontSize: '15px',verticalAlign: 'text-bottom' }} />
          )</span>
        </span>
          </span> }

         { nodeType === 'machineNode' &&
         <span style={{fontSize: '0.75rem', color: 'black'}}>
           {machineId} {machineName}
         </span>
         }
       </span>
      }
      classes={{ root: styles.treeItem }}
       onClick={() => handleClick(nodes)}
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node, handleClick)) : null}
    </StyledTreeItem>
  );
};

  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      refreshFlag={refreshFlag}
      sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}
    >
      {renderTree(data, handleClick)}
    </TreeView>
  );
}

export default RecursiveTreeView;
