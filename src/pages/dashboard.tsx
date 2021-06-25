import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/apiClient"

export default function Dashboard() {
  const { signOut, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      const response = api.get('/api/users?delay=2');

      console.log(response);
    } else {
      signOut();
    }

  }, [])


  return (
    <h1>Testing authentication</h1>
  )
}