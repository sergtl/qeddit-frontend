import { axiosClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { registerFormSchema } from "../model/useRegisterForm";

export function useRegister() {
  const router = useRouter();

  const {
    mutate: register,
    data,
    isPending: loading,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (registerData: z.infer<typeof registerFormSchema>) => {
      const response = await axiosClient({
        url: "/auth/login",
        method: "post",
        data: {
          ...registerData,
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
    register,
    data,
    loading,
  };
}
