import { useForm } from "react-hook-form";

function TempValid() {
  interface IForm {
    username: string;
    password: string;
    password2: string;
    email: string;
    phonenumber: string;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    setValue("username", "");
  };
  console.log(errors);

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register("username")} placeholder="username" />
      <span>{errors?.username?.message}</span>
      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Your password is too short.",
          },
        })}
        placeholder="password"
      />
      <span>{errors?.password?.message}</span>
      <input
        {...register("password2", {
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Your password is too short.",
          },
        })}
        placeholder="password2"
      />
      <span>{errors?.password2?.message}</span>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: "Only naver.com emails allowed",
          },
        })}
        placeholder="Email"
      />{" "}
      <span>{errors?.email?.message}</span>
      <input {...register("phonenumber")} placeholder="phonenumber" />
      <span>{errors?.phonenumber?.message}</span>
      <button>sign up</button>
    </form>
  );
}

export default TempValid;
