import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atoms";
import CreateTodo from "./CreateTodo";
import DraggableCard from "./DraggableCard";

interface IWrapperProps {
  draggingFromThisWith: Boolean;
  isDraggingOver: Boolean;
}

const ReturnDiv = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div<IWrapperProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "blue"
      : props.draggingFromThisWith
      ? "pink"
      : "red"};
  flex-grow: 1;
  padding: 10px 10px;
  transition: background-color 0.1s linear;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  todos: ITodo[];
  boardId: string;
}

function Board({ todos, boardId }: IBoardProps) {
  return (
    <ReturnDiv>
      <Title>{boardId}</Title>
      <CreateTodo boardId={boardId} />
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Wrapper
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableCard
                key={index}
                todoId={todo.id}
                todoText={todo.todo}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </ReturnDiv>
  );
}

export default Board;
