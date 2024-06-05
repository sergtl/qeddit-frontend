import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../api/useLogin";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function useLoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const { login, data, loading } = useLogin();

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    console.log("login form values", values);
    login(values);
  };

  console.log("data", data);

  return {
    form,
    onSubmit,
    loading,
  };
}
