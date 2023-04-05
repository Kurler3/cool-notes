import "./App.css"
import axios from "axios";
import {
  useQuery
} from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({});

function App() {
  
  const {
    isLoading,
    isError,
    data,
    error,
    refetch
  } = useQuery(
    ["notes"],
    () => axios.get("http://localhost:5000/api/notes/list")
    .then((res) => res.data)
  )

    if(isLoading) return "Loading...";

    if(error) return "An error has occurred:" + error;

    console.log(data);

  return (
    <div className="App">
      
    </div>
  )
}

export default App
