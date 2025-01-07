import * as React from "react";
import { FormEvent } from "react";
import { User } from "../../types.ts";
import useUsers from "../../hooks/useUsers.ts";

export default function NewUser() {
  const { addUser } = useUsers();
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [birthYear, setBirthYear] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [feedback, setFeedback] = React.useState<string>("");
  const { createFakeUser } = useUsers();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (firstName === "" || lastName === "" || birthYear === "") {
      setError("Wszystkie pola muszą być wypełnione");
      return;
    }

    const newUser: User = {
      firstName,
      lastName,
      birthYear: parseInt(birthYear),
    };

    addUser(newUser);
    setFeedback(
      `Czytelnik ${newUser.firstName} ${newUser.lastName} został dodany!`,
    );
    setFirstName("");
    setLastName("");
    setBirthYear("");
  };

  return (
    <div>
      <p className="sectionHeading">Nowy użytkownik</p>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Imię
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Nazwisko
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="birthYear" className="form-label">
            Rok urodzenia
          </label>
          <input
            type="number"
            className="form-control"
            id="birthYear"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {feedback && <div className="alert alert-success mt-3">{feedback}</div>}

        <div className="btn-group" role="group" aria-label="Buttons">
          <button type="submit" className="btn btn-primary">
            Dodaj
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={createFakeUser}
          >
            Dodaj losowego użytkownika
          </button>
        </div>
      </form>
    </div>
  );
}
