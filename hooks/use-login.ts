import { handleLogin } from "@/actions/auth";

export function useLogin() {
  return { handleLogin };
}
