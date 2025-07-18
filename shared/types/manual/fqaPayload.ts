export interface RegisterPayload {
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  is_first?: number | null;
  password?: string,
  username?: string,
  email?: null,
  codeRegId?: string
}