import { useSetRecoilState, useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ITodo, todoListState } from "../atoms";
import styled from "styled-components";

interface ICreateTodoProps {
  boardId: string;
}

const Wrapper = styled.form`
  display: flex;
  margin-bottom: 15px;
`;

function CreateTodo({ boardId }: ICreateTodoProps) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  // const setTodoList = useSetRecoilState(todoListState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ITodo>();

  const onSubmit = ({ todo }: ITodo) => {
    const idNow = Date.now();
    const newTodo = {
      id: idNow,
      todo: todo,
    };
    setTodoList((oldToDos) => {
      return {
        ...oldToDos,
        [boardId]: [newTodo, ...oldToDos[boardId]],
      };
    });
    setValue("todo", "");
  };

  useEffect(() => {
    localStorage.setItem("todoListState", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <>
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <input {...register("todo")} placeholder="text" />
        <button>submit</button>
      </Wrapper>
      {/* <span>{errors?.todo?.message}</span> */}
    </>
  );
}

export default CreateTodo;
