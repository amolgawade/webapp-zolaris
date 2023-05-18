import React from 'react';



export function Charts() {
    const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center',};
    const containerRowStyle = { display: 'flex',flexDirection: 'row', justifyContent: 'center',};
    const containerColumnStyle = {display: 'flex', flexDirection: 'column',alignItems: 'center',margin: '10px',};
    const Box = { width: '325px', backgroundColor: '#FFFFFF',border: '1px solid #000000',justifyContent: 'center',};
    const headerStyle = { display: 'flex', justifyContent: 'center', backgroundColor: '#f0f0f0', border: '1px solid #000000',margin: '-1px 0 0 0',};


   return (
       <div style={containerStyle}>
         <div style={containerRowStyle}>
           <div style={containerColumnStyle}>
             <div style={{ ...Box, height: '100px' }}>
               <h2 style={headerStyle}>Temperature</h2>
             </div>
           </div>
           <div style={containerColumnStyle}>
             <div style={{ ...Box, height: '100px' }}>
               <h2 style={headerStyle}>Humidity</h2>
             </div>
           </div>
           <div style={containerColumnStyle}>
             <div style={{ ...Box, height: '100px' }}>
               <h2 style={headerStyle}>Pressure</h2>
             </div>
           </div>
         </div>
         <div style={containerRowStyle}>
           <div style={containerColumnStyle}>
             <div style={{ ...Box, height: '350px' }}>
               <h2 style={headerStyle}>Temperature gauge</h2>
             </div>
           </div>
           <div style={containerColumnStyle}>
             <div style={{ ...Box, height: '350px' }}>
               <h2 style={headerStyle}>Humidity gauge</h2>
             </div>
           </div>
           <div style={containerColumnStyle}>
             <div style={{ ...Box, height: '350px' }}>
               <h2 style={headerStyle}>Pressure gauge</h2>
             </div>
           </div>
         </div>
         <div style={containerRowStyle}>
           <div style={containerColumnStyle}>
             <div style={{ ...Box, height: '350px' }}>
               <h2 style={headerStyle}>Temperature Chart</h2>
             </div>
           </div>
           <div style={containerColumnStyle}>
             <div style={{ ...Box, height: '350px' }}>
               <h2 style={headerStyle}>Humidity Chart</h2>
             </div>
           </div>
           <div style={containerColumnStyle}>
             <div style={{ ...Box, height: '350px' }}>
               <h2 style={headerStyle}>Pressure Chart</h2>
             </div>
           </div>
         </div>
       </div>
     );
   }

