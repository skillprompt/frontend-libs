import "./App.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LearnReactQuery } from "./LearnReactQuery";
import { Todo } from "./zustand/Todo";
// type LoginFormType = {
//   email: string;
//   password: string;
// };

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Must be at least 2 chars long",
    })
    .email(),
  password: z.string().min(8).max(15),
  // homework
  // TODO: add field confirmPassword
  // if password and confirmPassword do not match show error in confirmPassword field
});
type LoginFormType = z.infer<typeof LoginFormSchema>;

function App() {
  const form = useForm<LoginFormType>({
    mode: "all",
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const loginHandler: SubmitHandler<LoginFormType> = (values) => {
    console.log("form submitted...", values);
    // backend api call and pass data
    // email, password
  };

  console.log("errors", form.formState.errors);

  return (
    <div>
      <form onSubmit={form.handleSubmit(loginHandler)}>
        <div>
          <label>Email</label>
          <input
            {...form.register("email", {
              required: true,
            })}
          />
          {form.formState.errors.email && (
            <p
              style={{
                color: "red",
              }}
            >
              {form.formState.errors.email.message || "some error"}
            </p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            {...form.register("password", {
              minLength: 8,
            })}
          />
          {form.formState.errors.password && (
            <p
              style={{
                color: "red",
              }}
            >
              {form.formState.errors.password.message || "password error"}
            </p>
          )}
        </div>

        <button>Submit</button>
      </form>

      <Todo />
      <LearnReactQuery />
    </div>
  );
}

export default App;
