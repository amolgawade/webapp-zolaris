import React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <span style={styles.label}>
          {nodes.label}
        </span>
      }
      classes={{ root: styles.treeItem }}
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      style={styles.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}

export default RecursiveTreeView;
