import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginFormSchema } from "../model/useLoginForm";
import { API_URL } from "@/shared/config";

export function useLogin() {
  const {
    mutate: login,
    data,
    isPending: loading,
  } = useMutation({
    mutationFn: (loginData: z.infer<typeof loginFormSchema>) => {
      return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
    },
  });

  return {
    login,
    data,
    loading,
  };
}
