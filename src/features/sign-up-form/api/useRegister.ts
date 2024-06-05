import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerFormSchema } from "../model/useRegisterForm";
import { API_URL } from "@/shared/config";

export function useRegister() {
  const {
    mutate: register,
    data,
    isPending: loading,
  } = useMutation({
    mutationFn: (registerData: z.infer<typeof registerFormSchema>) => {
      return fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
    },
  });

  return {
    register,
    data,
    loading,
  };
}
