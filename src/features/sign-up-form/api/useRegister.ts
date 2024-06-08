import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerFormSchema } from "../model/useRegisterForm";
import { API_URL } from "@/shared/config";
import axios from "axios";

export function useRegister() {
  const {
    mutate: register,
    data,
    isPending: loading,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (registerData: z.infer<typeof registerFormSchema>) => {
      const response = await axios({
        url: `${API_URL}/auth/login`,
        method: "post",
        data: {
          ...registerData,
        },
      });

      return response;
    },
    onSuccess: (data) => {
      // save accessToken in localStorage
    },
  });

  return {
    register,
    data,
    loading,
  };
}
