import type { AuthToken, FQAResponse, UserInfo } from "~/types/manual/fqaRes";

const resourceProfile = "/social";

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

export default (fqaFetch: typeof $fetch, authFetch: typeof $fetch, store: StoreType) => ({
  login: (payload: { is_first: number }): Promise<FQAResponse<AuthToken>> => {
    const { is_first } = payload;
    return authFetch(
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
  userInfo: (): Promise<FQAResponse<UserInfo>> => {
    return fqaFetch(`${resourceProfile}/user/info`, {
      method: "GET",
    });
  },
});
