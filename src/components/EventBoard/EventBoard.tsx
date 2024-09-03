/* TODO: Remove all eslint-disable comments */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import '@xyflow/react/dist/style.css';

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  NodeTypes,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  useReactFlow,
} from '@xyflow/react';
import { useCallback } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { ReelSymbol } from '../../interfaces/step';
import { addNewNodeAction, updateEdgeStorageAction, updateNodeStorageAction } from '../../services/actions';
import { addNewReelsAction } from '../../services/actions/reelsState';
import { eventType } from '../EventItem/EventItem';
import Node from '../Node/Node';
import styles from './EventBoard.module.css';

const nodeTypes: NodeTypes = {
  init: Node,
  event: Node,
};

const EventBoard = () => {
  const dispatch = useAppDispatch();
  const reactFlowInstance = useReactFlow();
  const { steps, nodesStorage, edgesStorage, currentStepIndex } = useAppSelector((state) => state.mainReducer);
  const { reels } = useAppSelector((state) => state.reelStateReducer);

  const nodes = nodesStorage[currentStepIndex];
  const edges = edgesStorage[currentStepIndex];

  const updateNodeOrder = (currentEdges: Edge[]) => {
    const newNodesOrder: string[] = ['init'];
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));

    let currentId = 'init';
    while (currentId) {
      /* TODO: Remove all eslint-disable comments */
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      const edge = currentEdges.find((e) => e.source === currentId);
      if (edge) {
        currentId = edge.target;
        newNodesOrder.push(currentId);
      } else {
        currentId = '';
      }
    }

    const connectedNodes = newNodesOrder.map((id) => nodeMap.get(id)!);
    dispatch(updateNodeStorageAction(connectedNodes));
    dispatch(updateEdgeStorageAction(currentEdges, reels));
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdges = addEdge(connection, edges);
      updateNodeOrder(newEdges);
    },
    [updateNodeOrder],
  );

  const onEdgesDelete = useCallback(
    (deleted: Edge[]) => {
      const eds = [...edges];
      const newEdges = eds.filter((edge) => !deleted.some((del) => del.id === edge.id));
      updateNodeOrder(newEdges);
    },
    [updateNodeOrder],
  );

  const onDrop = (item: any, monitor: DropTargetMonitor) => {
    const position = monitor.getClientOffset();
    const id = `${item.name}-${Date.now()}`;
    if (!position) return;

    const newNode = {
      id,
      type: 'event',
      position: reactFlowInstance.screenToFlowPosition(position),
      data: { id, label: item.name },
    };
    const currentStep = steps[currentStepIndex];
    dispatch(addNewNodeAction(newNode));
    dispatch(addNewReelsAction(id, currentStep.payload.afterSymbols as ReelSymbol[]));
  };

  const [, dropRef] = useDrop({
    accept: eventType,
    drop: onDrop,
  });

  const onNodesChange: OnNodesChange = (changes) => {
    const newNodes = applyNodeChanges(changes, nodes);
    dispatch(updateNodeStorageAction(newNodes));
  };

  const onEdgesChange: OnEdgesChange = (changes) => {
    const newEdges = applyEdgeChanges(changes, edges);
    dispatch(updateEdgeStorageAction(newEdges, reels));
  };

  return (
    <div ref={dropRef} className={styles.container}>
      <ReactFlow
        nodes={nodesStorage[currentStepIndex]}
        edges={edgesStorage[currentStepIndex]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
      />
    </div>
  );
};

export default EventBoard;
