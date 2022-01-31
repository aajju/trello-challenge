import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoListState } from "./atoms";
import Board from "./components/Board";
import CreateBoard from "./components/CreateBoard";
import DelCard from "./components/DelCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  /* height: 80vh; */
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoListState);

  // Object.keys(todos).map((abc) => console.log(abc));
  const onDragEnd = (event: DropResult) => {
    console.log(event);
    const { source, destination } = event;
    if (!destination) return;
    // moved to delete area
    if (destination.droppableId === "delCard") {
      console.log("deleted");
      setTodos((allBoards) => {
        const copyBoard = [...allBoards[source.droppableId]];
        copyBoard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: copyBoard,
        };
      });
    }

    // moved in same board
    else if (destination.droppableId === source.droppableId) {
      setTodos((allBoards) => {
        const copyBoard = [...allBoards[source.droppableId]];
        const grabObj = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination.index, 0, grabObj);
        return {
          ...allBoards,
          [destination.droppableId]: copyBoard,
        };
      });
    }

    // moved to another board
    else if (destination.droppableId !== source.droppableId) {
      setTodos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const grabObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, grabObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CreateBoard />
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board key={boardId} todos={todos[boardId]} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
      <DelCard />
    </DragDropContext>
  );
}

export default App;
