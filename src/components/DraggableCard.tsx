import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps {
  isDragging: Boolean;
  // combineWith: string;
}

const Card = styled.div<ICardProps>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "tomato" : props.theme.cardColor};
  box-shadow: ${(props) => (props.isDragging ? "2px 2px 2px black" : "none")};
`;

interface IDraggableCardProps {
  todoId: number;
  todoText: string;
  index: number;
}

function DraggableCard({ todoId, todoText, index }: IDraggableCardProps) {
  return (
    <Draggable key={todoId} index={index} draggableId={todoId + ""}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          // combineWith={snapshot.combineWith}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
