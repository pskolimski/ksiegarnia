import * as React from "react";
import {FormEvent, useEffect} from "react";
import {User} from "../../types.ts";

interface NewUserProps {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export default function NewUser({setUsers}: NewUserProps) {
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [birthYear, setBirthYear] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const [feedback, setFeedback] = React.useState<string>('');

    const addUser = (userWithoutCode: User) => {
        const code = userWithoutCode.firstName.slice(0, 2) + userWithoutCode.birthYear.toString().slice(-2) + userWithoutCode.lastName.slice(-2);

        setUsers((prevUsers) => [...prevUsers, {...userWithoutCode, code}]);
        setFeedback(`Czytelnik ${userWithoutCode.firstName} ${userWithoutCode.lastName} został dodany!`);
    }

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
        }

        addUser(newUser);
        setFirstName("");
        setLastName("");
        setBirthYear("");
    }

    useEffect(() => {
        return () => {
            const user = {
                firstName: "Patryk",
                lastName: "Skolimowski",
                birthYear: 2006
            }

            addUser(user);
            alert("Dodawanie czytelnika przy starcie aplikacji...")
        }
    }, [])

    return (
        <div>
            <p className="sectionHeading">Nowy użytkownik</p>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Imię</label>
                    <input type="text" className="form-control" id="firstName" value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Nazwisko</label>
                    <input type="text" className="form-control" id="lastName" value={lastName}
                           onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="birthYear" className="form-label">Rok urodzenia</label>
                    <input type="number" className="form-control" id="birthYear" value={birthYear}
                           onChange={(e) => setBirthYear(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Dodaj</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {feedback && <div className="alert alert-success mt-3">{feedback}</div>}
        </div>
    )
}