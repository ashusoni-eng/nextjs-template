export interface Credentials {
    email : string,
    password : string
}

export interface RegisterUser {
    fullName : string,
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

export interface verifyOtpResponse {
   message: string;
  success: boolean;
  data : {
    user : {
      id: string;
      fullName: string;
      email: string;
      phone: string;      
      isEmailVerified: boolean;
    },
    access_token: string
    refres_token: string
  }
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    otp: string;
    otpExpire: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      phone: string;
      accountType: string;
      isEmailVerified: boolean;
    }
  };
  timestamp: string;
}
