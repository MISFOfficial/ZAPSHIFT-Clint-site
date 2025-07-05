import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/Loader/Loading';
import { Navigate } from 'react-router';
import { AuthContext } from '../UserAuth/AuthContext';

const PrivetRout = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to='/login'></Navigate>
    }

    return children;
};

export default PrivetRout;