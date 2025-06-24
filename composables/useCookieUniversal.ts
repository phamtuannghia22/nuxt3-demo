export function useCookieUniversal() {
  return {
    getCookie: (name: string) => {
      const cookie = useCookie(name);
      return cookie.value;
    },
    clearCookie: (name: string) => {
      const cookie = useCookie(name, {
        path: "/",
      });
      cookie.value = '';
    },
    setCookie: (name: string, value: string) => {
      const cookie = useCookie(name, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
        path: '/',
        sameSite: 'lax',
        secure: true,
      });
      cookie.value = value;
    }
  };
}
