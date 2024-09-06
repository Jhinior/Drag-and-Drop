import React from "react";
import { useDrag } from "react-dnd";

function Node({id,logo,name}){
    const [{isDragging},drag] = useDrag(()=>({
        type: "div",
        item: {id:id},
        collect: (monitor)=>({
            isDragging: !!monitor.isDragging()
        })
    }))
    return(
        <div ref={drag} className="node" >
            <img src={logo} width="50px"/>
            <h3>{name}</h3>
        </div>
    )
}

export default Node;