import { Credentials, ForgotPasswordRequest, GenericResponse, LoginResponse, OtpRequest, RegisterResponse, RegisterUser, ResetPasswordRequest, VerifyOtpRequest, verifyOtpResponse } from "@/types/auth";
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

export const register = async (credentials: RegisterUser): Promise<RegisterResponse> => {
    try {
        const res = await apiClient.post<RegisterResponse>("/auth/register", credentials);
        return res.data;
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

export const verifyOtp = async (payload: VerifyOtpRequest): Promise<verifyOtpResponse> => {
    try {
        const res = await apiClient.post<verifyOtpResponse>("/auth/verify-otp", payload);
        return res.data;
    } catch (err) {
        throw handleError(err as AxiosError);
    }
};

export const logout = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user"); 
};