// composables/repositories/user.ts
import type { FQAResponse, UserInfo } from "@manual-types/fqaRes";

const resource = "/social";

export function useUserRepository() {
  const { $fqaFetch } = useNuxtApp();

  const get = <T>(url: string) => {
    return $fqaFetch<T>(`${resource}${url}`, {
      method: "GET",
    });
  };

  return {
    userInfo: (): Promise<FQAResponse<UserInfo>> => get<FQAResponse<UserInfo>>("/user/info"),
  };
}
