import { createContext, useContext, useReducer } from "react";

const ValueContext = createContext({
  state: {},
  dispatch: (params: { type: string; payload: {} }) => {},
});

export const PackageProvider = ({ children, value, dispatch }: any) => {
  return (
    <ValueContext.Provider value={{ state: value, dispatch }}>
      {children}
    </ValueContext.Provider>
  );
};

export const useValues = () => {
  const context = useContext(ValueContext);
  if (!context) {
    throw new Error("useValues 必须在 ValueProvider 内部使用");
  }
  return context.state;
};

export const useDisplay = () => {
  const context = useContext(ValueContext);
  if (!context) {
    throw new Error("useDispatch 必须在 ValueProvider 内部使用");
  }
  return context.dispatch;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      return { ...state, ...action.payload };
  }
};

// 业务组件
const Demo = () => {
  const display = useDisplay();
  const value = useValues();

  console.log("value", value);

  display({ type: "set", payload: { name: "react-bank" } });
  return <div>demo</div>;
};

// 包裹组件
export default () => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <PackageProvider value={state} dispatch={dispatch}>
      <Demo />
    </PackageProvider>
  );
};
