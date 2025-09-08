import { Credentials, ForgotPasswordRequest, GenericResponse, LoginResponse, OtpRequest, RegisterUser, ResetPasswordRequest, VerifyOtpRequest } from "@/types/auth";
import axios, { AxiosError } from "axios";
import { handleError } from "./response";
import { BACKEND_URL } from "./api";

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = async (credentials: Credentials): Promise<LoginResponse> => {
    try {
        const res = await apiClient.post<LoginResponse>("/auth/login", credentials);
        const data = res.data;

        if (data?.access_token) {
            localStorage.setItem("access_token", data.access_token);
        }

        return data;
    } catch (err) {
        throw handleError(err as AxiosError);
    }
}

export const register = async (credentials: RegisterUser): Promise<LoginResponse> => {
    try {
        const res = await apiClient.post<LoginResponse>("/auth/register", credentials);
        const data = res.data;

        if (data?.access_token) {
            localStorage.setItem("access_token", data.access_token);
        }

        return data;
    } catch (err) {
        throw handleError(err as AxiosError);
    }
}

export const forgotPassword = async (payload: ForgotPasswordRequest): Promise<GenericResponse> => {
    try {
        const res = await apiClient.post<GenericResponse>("/auth/forgot-password", payload);
        return res.data;
    } catch (err) {
        throw handleError(err as AxiosError);
    }
};

export const resetPassword = async (payload: ResetPasswordRequest): Promise<GenericResponse> => {
    try {
        const res = await apiClient.post<GenericResponse>("/auth/reset-password", payload);
        return res.data;
    } catch (err) {
        throw handleError(err as AxiosError);
    }
};

export const sendOtp = async (payload: OtpRequest): Promise<GenericResponse> => {
    try {
        const res = await apiClient.post<GenericResponse>("/auth/send-otp", payload);
        return res.data;
    } catch (err) {
        throw handleError(err as AxiosError);
    }
};

export const verifyOtp = async (payload: VerifyOtpRequest): Promise<GenericResponse> => {
    try {
        const res = await apiClient.post<GenericResponse>("/auth/verify-otp", payload);
        return res.data;
    } catch (err) {
        throw handleError(err as AxiosError);
    }
};

export const logout = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user"); 
};