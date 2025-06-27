export interface AuthToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  is_first: number | null;
}

export interface TransferInfo {
  bankName: string;
  bankNumber: string;
  fullName: string;
  momoPhone: string;
  zalopayPhone: string;
  timestamp: string | null;
}

export interface UserInfo {
  fid: number;
  accountId: number;
  point: number;
  nickname: string;
  imageProfile: string;
  email: string;
  phone: string;
  schoolId: string;
  classId: number;
  birthDay: string;
  gender: number;
  status: number;
  provinceId: string;
  districtId: string;
  activeDate: string;
  token: string | null;
  isEmailConfirm: number;
  username: string;
  source: string;
  avatarThumbnail: string;
  levelId: number | null;
  level: number | null;
  levelName: string | null;
  iconLevel: string | null;
  nextLevel: number | null;
  nextIconLevel: string | null;
  nextExp: number | null;
  exp: number | null;
  className: string;
  provinceName: string;
  districtName: string;
  schoolName: string;
  accountType: string;
  statusList: string;
  sourceId: number;
  sourceName: string;
  transferInfo: TransferInfo;
  tutorId: number | null;
  idCard: string;
  issueDate: string | null;
  expireDate: string | null;
  issuedBy: string;
  verifyStatusPhone: number;
  verifyStatusIdCard: number;
}

export interface FQAResponse<T> {
  msg: {
    code: string;
    status: string;
    response_time: number;
  };
  data: T;
}
