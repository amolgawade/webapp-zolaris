import React, { createContext, useState } from 'react';
import App from './App';


export const MachineContext = createContext();

const MachineProvider = ({ children }) => {
  const [machineData, setMachineData] = useState(null);

  const setMachine = (data) => {
    const machine = { data };
    setMachineData(machine);
    //console.log(`In machine context:`, machine);
  };
   //console.log(`In machine context machineData:`,machineData);

  return (
    <MachineContext.Provider value={{ machineData, setMachine }}>
      {children}
    </MachineContext.Provider>
  );
};

export default MachineProvider;