import { Handle, Position } from '@xyflow/react';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { storeCurrentNodeIdAction, toggleModalAction } from '../../services/actions';
import NodePreview from '../NodePreview/NodePreview';
import styles from './Node.module.css';

interface NodeProps {
  data: {
    id: string;
    label: string;
  };
}

const Node: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [showPreview, setShowPreview] = useState(false);

  const handleMouseEnter = () => {
    dispatch(storeCurrentNodeIdAction(data.id));
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  const handleOnClick = () => {
    dispatch(toggleModalAction());
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.node}
        type="button"
        onClick={handleOnClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
        <div className={styles.nodeText}>{data.label}</div>
      </button>
      {showPreview && <NodePreview />}
    </div>
  );
};

export default Node;
