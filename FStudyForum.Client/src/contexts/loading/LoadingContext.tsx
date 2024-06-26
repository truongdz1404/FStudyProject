import React from "react";
import { FC, PropsWithChildren } from "react";
import LoadingBar from "react-top-loading-bar";

export interface LoadingContextType {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const LoadingContext = React.createContext<LoadingContextType>({
  progress: 0,
  setProgress: () => null
});

const LoadingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [progress, setProgress] = React.useState(0);

  return (
    <>
      <LoadingBar
        color="#ff7518"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <LoadingContext.Provider value={{ progress, setProgress }}>
        {children}
      </LoadingContext.Provider>
    </>
  );
};

export default LoadingProvider;
