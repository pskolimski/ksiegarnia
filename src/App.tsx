import {useState} from "react";
import initialUsers from './data/data.json';
import type {User} from "./types.ts";
import NewUser from "./components/NewUser/NewUser.tsx";
import Users from "./components/Users/Users.tsx";


export default function App() {
    const [users, setUsers] = useState<User[]>(initialUsers);

    return (
        <div className="container my-5">
            <h1>Księgarnia</h1>

            <div className="wrapper">
                <NewUser setUsers={setUsers}/>
                <Users users={users}/>
            </div>
        </div>
    )
}