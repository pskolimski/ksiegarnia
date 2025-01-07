import useUsers from "../../hooks/useUsers.ts";
import { User } from "../../types.ts";

export default function Users() {
  const { users } = useUsers();

  return (
    <div>
      <p className="sectionHeading">Czytelnicy</p>

      <table className="table">
        <thead>
          <tr>
            <th>Kod</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rok urodzenia</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, index: number) => (
            <tr key={index}>
              {user.code ? <td>{user.code}</td> : <td>Brak kodu</td>}
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.birthYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
