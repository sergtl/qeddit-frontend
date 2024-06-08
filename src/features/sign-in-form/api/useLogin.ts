import { API_URL } from "@/shared/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { loginFormSchema } from "../model/useLoginForm";

export function useLogin() {
  const {
    mutate: login,
    data,
    isPending: loading,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (loginData: z.infer<typeof loginFormSchema>) => {
      const response = await axios({
        url: `${API_URL}/auth/login`,
        method: "post",
        data: {
          ...loginData,
        },
      });

      return response;
    },
    onSuccess: (data) => {
      // save accessToken in localStorage
    },
  });

  return {
    login,
    data,
    loading,
  };
}
