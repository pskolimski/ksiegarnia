import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";
import initialUsers from "../data/data.json";
import { fakerPL as faker, SexType } from "@faker-js/faker";

export interface UsersContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  addUser: (user: User) => void;
  createFakeUser: () => void;
  clearLocalStorage: () => void;
}

export const UsersContext = createContext<UsersContextType | null>(null);

interface UsersProviderProps {
  children: ReactNode;
}

export default function UsersProvider({ children }: UsersProviderProps) {
  const { data, setData } = useLocalStorage<User[]>("users", initialUsers);
  const [users, setUsers] = useState<User[]>(data);

  const addUser = (userWithoutCode: User) => {
    const code =
      userWithoutCode.firstName.slice(0, 2) +
      userWithoutCode.birthYear.toString().slice(-2) +
      userWithoutCode.lastName.slice(-2);

    setUsers((prevUsers) => [...prevUsers, { ...userWithoutCode, code }]);
  };

  const clearLocalStorage = () => {
    const isConfirmed = confirm("Na pewno wyczyścić pamięć lokalną?");

    if (isConfirmed) {
      setUsers(initialUsers);
    }
  };

  const createFakeUser = () => {
    const userSex: SexType = faker.person.sex() as SexType;

    const user = {
      firstName: faker.person.firstName(userSex),
      lastName: faker.person.lastName(userSex),
      birthYear: Math.floor(Math.random() * (2003 - 1970 + 1) + 1970),
    };

    addUser(user);
  };

  useEffect(() => {
    setData(users);
    console.log("Saved data to localStorage");
  }, [users, setData]);

  return (
    <UsersContext.Provider
      value={{ users, setUsers, addUser, createFakeUser, clearLocalStorage }}
    >
      {children}
    </UsersContext.Provider>
  );
}
