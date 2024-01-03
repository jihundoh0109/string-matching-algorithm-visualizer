"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type UserInputProviderContextType = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  pattern: string;
  setPattern: Dispatch<SetStateAction<string>>;
  algorithm: string;
  setAlgorithm: Dispatch<SetStateAction<string>>;
};

type UserInputProviderProps = {
  children: React.ReactNode;
};

const UserInputContext = createContext<
  UserInputProviderContextType | undefined
>(undefined);

export function UserInputProvider({ children }: UserInputProviderProps) {
  const [text, setText] = useState("");
  const [pattern, setPattern] = useState("");
  const [algorithm, setAlgorithm] = useState("");

  return (
    <UserInputContext.Provider
      value={{
        text,
        setText,
        pattern,
        setPattern,
        algorithm,
        setAlgorithm,
      }}
    >
      {children}
    </UserInputContext.Provider>
  );
}

export function useUserInput() {
  const context = useContext(UserInputContext);

  if (context === undefined) {
    throw new Error("useUserInput must be used within a UserInputProvider");
  }

  return context;
}
