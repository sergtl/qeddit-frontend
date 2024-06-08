import { axiosClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { loginFormSchema } from "../model/useLoginForm";

export function useLogin() {
  const router = useRouter();

  const {
    mutate: login,
    data,
    isPending: loading,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (loginData: z.infer<typeof loginFormSchema>) => {
      const response = await axiosClient({
        url: "/auth/login",
        method: "post",
        data: {
          ...loginData,
        },
      });

      return response;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      router.replace("/");
    },
  });

  return {
    login,
    data,
    loading,
  };
}
