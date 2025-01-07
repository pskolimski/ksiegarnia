import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage.ts";
import useUsers from "../../hooks/useUsers.ts";

export default function Settings() {
  const { data: isAddingActiveData, setData: setIsAddingActiveData } =
    useLocalStorage<boolean>("isAddingActive", false);
  const [isAddingActive, setIsAddingActive] =
    useState<boolean>(isAddingActiveData);
  const { createFakeUser, clearLocalStorage } = useUsers();

  useEffect(() => {
    return () => {
      if (isAddingActiveData) {
        createFakeUser();
        alert("Dodawanie czytelnika przy starcie aplikacji...");
      }
    };
  }, []);

  useEffect(() => {
    setIsAddingActiveData(isAddingActive);
  }, [isAddingActive, setIsAddingActiveData]);

  return (
    <div>
      <p className="sectionHeading">Ustawienia</p>

      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isAddingActive}
            onChange={(e) => setIsAddingActive(e.target.checked)}
            id="isActiveCheck"
          />
          <label className="form-check-label" htmlFor="isActiveCheck">
            Włącz dodawanie użytkownika przy starcie aplikacji (losowe dane z
            API)
          </label>
        </div>

        <button
          className="btn btn-outline-danger mt-5"
          onClick={clearLocalStorage}
        >
          Wyczyść pamięć lokalną
        </button>
      </div>
    </div>
  );
}
