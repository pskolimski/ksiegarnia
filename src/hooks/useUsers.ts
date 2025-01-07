import { useContext } from "react";
import { UsersContext, UsersContextType } from "../providers/UsersProvider";

export default function useUsers(): UsersContextType {
  const ctx = useContext(UsersContext);

  if (!ctx) {
    throw new Error("useUsers must be used within a UsersProvider");
  }

  return ctx;
}
