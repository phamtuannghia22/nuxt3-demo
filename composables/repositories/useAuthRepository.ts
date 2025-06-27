import type { AuthToken, FQAResponse } from "~/types/manual/fqaRes";
import { useStore } from "~/stores";

const generateParams = (params: object) => {
  const removedBlankValueParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null),
  );
  return new URLSearchParams(removedBlankValueParams).toString();
};

const getOSType = (os: string) => {
  if (os === "android") {
    return 1;
  }
  if (os === "windows") {
    return 3;
  }
  if (["ios", "macos"].includes(os)) {
    return 2;
  }
  return 4;
};

export function useAuthRepository () {
  const { $authFetch } = useNuxtApp();
  const store: StoreType = useStore();
  return {
    login: (payload: { is_first: number }): Promise<FQAResponse<AuthToken>> => {
      const { is_first } = payload;
      return $authFetch(
        `auth/login?${generateParams({
          is_first,
          app_type: store.isMobile ? 3 : 1,
          os_type: getOSType(store.os),
        })}`,
        {
          method: "POST",
          body: payload,
        },
      );
    },
  };
}
