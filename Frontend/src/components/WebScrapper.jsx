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
// function WebScrapper({id,position,onSubmit}){
//     const [url,setUrl]=useState('')
//     const [{isDragging},drag] = useDrag(()=>({
//         type: "div",
//         item: {id:id},
//         collect: (monitor)=>({
//             isDragging: !!monitor.isDragging()
//         })
//     }))

//     const handleChange = (e) => {
//         const url = e.target.value;
//         setUrl(url);
//     };

//     const handleSubmit = (e)=>{
//         e.preventDefault()
//         onSubmit(url)
//     }
//     return(
//         <div ref={drag} className="webScrapper" style={{
//             left: position ? position.x : 0,
//             top: position ? position.y : 0,
//             position: 'absolute',
//             }}>
//             <div className="windowTitle">
//                 <img src="src/assets/blackweb.svg"/>
//                 <h3>Web Scrapper</h3>
//             </div>
//             <div className="urlForm">
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor='url' >URL</label>
//                     <input type="text" name="url" id="url" onChange={handleChange}/>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default WebScrapper