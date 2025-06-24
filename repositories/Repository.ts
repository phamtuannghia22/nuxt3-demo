import UserRepository from "~/repositories/UserRepository";

export default (api: typeof $fetch, authFetch: typeof $fetch,store: StoreType) => ({
  user: UserRepository(authFetch, store),
});
