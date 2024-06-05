import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRegister } from "../api/useRegister";

export const registerFormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export function useRegisterForm() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const { register, data, loading } = useRegister();

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    console.log("register form values", values);
    register(values);
  };

  return {
    form,
    onSubmit,
    loading,
  };
}
