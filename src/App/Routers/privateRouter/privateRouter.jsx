import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRouter = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');  // Перенаправляем на страницу входа, если нет токена
        }
    }, [token, navigate]);

    return token ? <Outlet /> : null;
};

export default PrivateRouter;
