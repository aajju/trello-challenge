import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IWrapperProps {
  isDraggingOver: Boolean;
  draggingFromThisWith: Boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: ${(props) =>
    props.isDraggingOver ? "gray" : "whitesmoke"};
  margin-top: 40px;
`;

function DelCard() {
  return (
    <Droppable droppableId="delCard">
      {(provided, snapshot) => (
        <Wrapper
          isDraggingOver={snapshot.isDraggingOver}
          draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          delete (drag into here)
        </Wrapper>
      )}
    </Droppable>
  );
}

export default DelCard;
