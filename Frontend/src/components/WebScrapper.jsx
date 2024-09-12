import React, { useState} from "react";
import { Handle, Position } from '@xyflow/react';


function WebScrapper({id,data,isConnectable}){
    const [url,setUrl]=useState('')
    const handleChange = (e) => {
        const url = e.target.value;
        setUrl(url);
    };
    const handleSubmit = (e)=>{
        e.preventDefault()
        data.handleSubmit(url,id)
    }
    return(
        <div className="webScrapper">
            <div className="windowTitle">
                <img src={data.image}/>
                <h3>{data.label}</h3>
            </div>
            <div className="urlForm">
                <form onSubmit={handleSubmit}>
                    <label htmlFor='url' >URL</label>
                    <input type="text" name="url" id="url" onChange={handleChange}/>
                </form>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
        </div>
    )
}

export default WebScrapper
