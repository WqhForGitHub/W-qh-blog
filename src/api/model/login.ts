export interface login {
  userName?: string;
  password?: string;
  code?: number;
  token?: any
  res1?: any,
  data?: any
}

export interface register {
  userName: string;
  password: string;
  code?: number;
}

export interface registerRes {
  message: string;
  code?: number;
  token?: string;
}

export interface loginOut {
  token?: string | null
  code?: number | undefined
}
