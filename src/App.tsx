import NewUser from "./components/NewUser/NewUser.tsx";
import Users from "./components/Users/Users.tsx";
import Settings from "./components/Settings/Settings.tsx";
import UsersProvider from "./providers/UsersProvider.tsx";

export default function App() {
  return (
    <UsersProvider>
      <div className="container my-5" data-bs-theme="dark">
        <h1>Księgarnia</h1>
        <p>Patryk Skolimowski</p>

        <div className="wrapper">
          <div>
            <NewUser />
            <Settings />
          </div>
          <Users />
        </div>
      </div>
    </UsersProvider>
  );
}
