export interface Credentials {
    email : string,
    password : string
}

export interface RegisterUser {
    name : string,
    phone : string,
    email : string,
    password : string
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;      
  password: string;
}

export interface OtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface GenericResponse {
  message: string;
  success: boolean;
}
