import React, { createContext, useState } from "react";
import { urlBuilder } from "../../helpers/urlBuilder";

export const NurseryContext = createContext();

export const NurseryProvider = (props) => {
  
  const [nurseries, setNurseries] = useState([]);

  const getNurseries = () => {
    return fetch(urlBuilder('nurseries'))
    .then(res => res.json())
    .then(setNurseries);
  }

  const addNursery = nursery => {
    return fetch(urlBuilder('nurseries'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nursery)
    }).then(getNurseries);
  }

  return (
    <NurseryContext.Provider value={{
      nurseries, getNurseries, addNursery
    }}>
      {props.children}
    </NurseryContext.Provider>
  );
}