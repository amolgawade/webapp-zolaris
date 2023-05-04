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
  const { data } = props;

  const styles = {
    root: {
      height: '100%',
      flexGrow: 1,
      maxWidth: 400,
    },
    label: {
      fontWeight: 'bold',
    },
    treeItem: {
      '&:hover > $label': {
        color: 'blue',
        cursor: 'pointer',
      },
    },
  };

const handleViewMachine = (node) => {
  // Code to display machine information or take some other action
  console.log(`View machine for node with id ${node.id} and value ${node.value}`);
  navigate('/pages/machineDetails/?id='+ node.id);

}
const navigate = useNavigate();

const renderTree = (nodes) => {
  const labelValues = nodes.label?.split('~');
  const firstName = labelValues?.[0];
  const lastName = labelValues?.[1];
  const userType = labelValues?.[2];
  const machineCount = labelValues?.length > 3 ?  labelValues?.[3] : 0;
  const machineString = labelValues?.[4];
  const showViewMachineButton = userType === "Technical Incharge";

  return (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
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
            {machineCount} {machineString} <CheckCircleOutlineRoundedIcon sx={{ color: '#2abe25', fontSize: '15px',verticalAlign: 'text-bottom' }} />
          )</span>
        </span>
          {showViewMachineButton ? (
            <Button
              variant="contained"
              color="secondary"
              sx={{ p: '1px 8px', m: '5px' }}
              onClick={() => handleViewMachine(nodes)}
            >
              View Machine
            </Button>
          ) : (
           <p/>
          )}
          </span>
      }
      classes={{ root: styles.treeItem }}
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
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
      sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}
    >
      {renderTree(data)}
    </TreeView>
  );
}

export default RecursiveTreeView;
