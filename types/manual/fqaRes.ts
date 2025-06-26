export interface AuthToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  is_first: number;
}

export interface FQAResponse<T> {
  msg: {
    code: string;
    status: string;
    response_time: number;
  };
  data: T;
}
