"use client";

import { useAuth } from "./auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminRoute = ({children } : {children : React.ReactNode}) => {
    const { isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!isAdmin) {
            router.push("/");
        }
    }, [isAdmin, router]);

    return isAdmin ? <>{children}</> : null;
}

export default AdminRoute