import UserRepository from "~/repositories/UserRepository";

export default (fqaFetch: typeof $fetch, authFetch: typeof $fetch, store: StoreType) => ({
  user: UserRepository(fqaFetch, authFetch, store),
});
