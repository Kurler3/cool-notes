import axios from "axios";
import {
  useQuery
} from "react-query";
import { INote } from "./types/note.types";
import Note from "./components/Note.component";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import notesPageStyles from "./styles/notesPage.module.css";

function App() {
  
  const {
    isLoading,
    isError,
    data,
    error,
    refetch
  } = useQuery<INote[]>(
    ["notes"],
    () => axios.get("http://localhost:5000/api/notes/list")
    .then((res) => res.data)
  )

  if(isLoading) return "Loading...";

  if(error) return "An error has occurred:" + error;

  console.log(data);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="gap-4">
        {
          data?.map((note) => {
            return (
              <Col key={note._id}>
                <Note 
                  note={note}
                  className={notesPageStyles.note}
                />
              </Col>
            )
          })
        }
      </Row>
        
    </Container>
  )
}

export default App
