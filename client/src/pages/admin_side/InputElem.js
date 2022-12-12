import React from 'react'; 
import { useState } from 'react'; 

function InputElem(props) { 
  
  const [textareaheight, setTextareaheight] = useState(1); 
  
  function handleChange(event) { 
    
    console.log( event.target.rows ) 
    const height = event.target.scrollHeight; 
    const rowHeight = 15; 
    const trows = Math.ceil(height / rowHeight) - 1; 
    
    if (trows == textareaheight) { 
      
      setTextareaheight(trows); 
      
    } 
    
  } 
  
  return ( 
    
    <div> 
    
      <textarea rows={textareaheight} onChange={handleChange} {...props.canType}> </textarea> 
      
    </div> 
  
  ); 
  
} 

export { InputElem };