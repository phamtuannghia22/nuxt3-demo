import type { FQAResponse, UserInfo } from "@types/fqaRes";

const resourceProfile = "/social";

export function useUserRepository() {
  const { $fqaFetch } = useNuxtApp();
  return {
    userInfo: (): Promise<FQAResponse<UserInfo>> => {
      return $fqaFetch(`${resourceProfile}/user/info`, {
        method: "GET",
      });
    },
  };
}
