export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): { data: T; setData: (newData: T) => void } {
  const dataString = localStorage.getItem(key);

  function setData(newData: T) {
    localStorage.setItem(key, JSON.stringify(newData));
  }

  if (!dataString) {
    setData(initialValue);
    return { data: initialValue, setData };
  }

  const data: T = JSON.parse(dataString);

  return { data, setData };
}
