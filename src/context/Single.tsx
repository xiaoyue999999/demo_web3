import React, { createContext } from "react";

export const ValueContext = createContext<any>(null);

const DemoInfo = () => {
  const { name } = React.useContext(ValueContext);
  return <h1>demo info === {name}</h1>;
};

const Demo = () => {
  return (
    <ValueContext.Provider value={{ name: "2121" }}>
      <h1>shiyong</h1>
    </ValueContext.Provider>
  );
};

export default Demo;
