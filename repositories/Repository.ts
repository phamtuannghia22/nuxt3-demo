import UserRepository from "~/repositories/UserRepository";

export default (api: typeof $fetch, store: StoreType) => ({
  user: UserRepository(api, store),
});
