import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodoListState, todoListState } from "../atoms";
import { useRecoilState } from "recoil";

const Wrapper = styled.form`
  display: flex;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: wheat;
  margin-bottom: 40px;
`;

function CreateBoard() {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ITodoListState>();

  const onSubmit = ({ data }: any) => {
    setTodoList((oldBoards) => {
      return {
        ...oldBoards,
        [data]: [],
      };
    });

    setValue("data", []);
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <input {...register("data")} type="text" placeholder="add a board..." />
      <button>new board</button>
    </Wrapper>
  );
}
export default CreateBoard;
