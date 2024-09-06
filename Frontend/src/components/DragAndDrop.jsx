import React, { useCallback, useState, useEffect } from 'react';
import { useDrop } from "react-dnd";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import Node from './Node' 
import '@xyflow/react/dist/style.css';
import WebScrapper from './WebScrapper';
import Summary from './Summary';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';



function DragAndDrop() {
    const [nodeOutputs, setNodeOutputs] = useState({});
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
      );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
      );
    const onConnect = useCallback(
        (params) => {
            const newEdge = {
                id: `edge-${params.source}-${params.target}`,
                source: params.source,
                target: params.target,
                data: { output: nodeOutputs[params.source] || '' },
            };
    
            setEdges((eds) => [...eds, newEdge]);
        },
        [setEdges,nodeOutputs]
    );
   
    const handleEdgeData = (edge) => {
        const { output } = edge.data;
        setNodes((nds) =>
            nds.map((node) =>
                node.id === edge.target
                    ? { ...node, data: { ...node.data, output } }
                    : node
            )
        );
    };

    useEffect(() => {
        setEdges((eds) =>
            eds.map((edge) => ({
                ...edge,
                data: { ...edge.data, output: nodeOutputs[edge.source] || '' }
            }))
        );
    }, [nodeOutputs, setEdges]);

    useEffect(() => {
        edges.forEach((edge) => handleEdgeData(edge));
    }, [edges]);

    const [{isOver},drop] = useDrop(()=>({
        accept: "div",
        drop: (item,monitor) => {
            const delta = monitor.getClientOffset()
            const dropPosition = {
                x : delta.x,
                y : delta.y
            }
            addNodeToWorkspace(item.id,dropPosition)
        },
        collect: (monitor)=>({
            isOver: !!monitor.isOver()
        })

    }))

    const handleSubmit = async (url,nodeId) => {
        try{
            const response = await axios.get('https://drag-and-drop-webscraper-with-llm.onrender.com/scrapper',{params: { url }})
            const output = response.data.message
            setNodeOutputs((prevOutputs) => ({ ...prevOutputs, [nodeId]: output }));
        }catch (error) {
                setNodeOutputs((prevOutputs) => ({ ...prevOutputs, [nodeId]: error.response.data.message }));
        }
    }
     
    const initialNodes = [
      { id:'1', type: 'webScrapper', data: { label: 'Web Scrapper', image: "./src/assets/blackweb.svg", handleSubmit } },
      { id:'2', type: 'summary', data: { label: 'Summary', image: "./src/assets/black.svg" } },
    ];
    
    const nodeTypes = {
        webScrapper: WebScrapper,
        summary: Summary,
      };
    
    const addNodeToWorkspace = (itemId,position) => {
        const node = initialNodes.find(node=>node.id === itemId.toString())
        setNodes(nodes => [...nodes,{...node,position:position,id:uuidv4()}])
    }

return (
        <>
            <div className="nodes">
                <img id='cloud' src="./src/assets/cloud.svg"/>
                {initialNodes.map((node)=>{
                    return <Node key={node.id} id={node.id} logo={node.data.image === "./src/assets/blackweb.svg" ?  "./src/assets/web.svg" : ".//assets/summary.svg"} name={node.data.label}/>
                })}
            </div>
            <div ref={drop} className="workplace">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                >
                </ReactFlow>
            </div>
        </>
  );
}

export default DragAndDrop;

