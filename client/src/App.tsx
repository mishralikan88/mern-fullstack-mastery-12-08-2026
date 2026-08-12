import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Checking backend...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/health`,
        );

        const data = await response.json();

        setMessage(data.message);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setMessage("Backend connection failed");
      }
    };

    checkBackend();
  }, []);

  return (
    <div>
      <h1>MERN Master Project</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
