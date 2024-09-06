import React from "react";
import { Handle, Position } from '@xyflow/react';

function Summary({data,isConnectable}){
    return(
        <div className="Summary" >
            <Handle type="target" position={Position.Top} id="b" isConnectable={isConnectable} />
            <div className="windowTitle">
                <img src={data.image}/>
                <h3>{data.label}</h3>
            </div>
            <div className="urlForm">
                <form>
                    <h3>Output: </h3>
                    <p>{data.output ? data.output : ''}</p>
                </form>
            </div>
        </div>
    )
}

export default Summary