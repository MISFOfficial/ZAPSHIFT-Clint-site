import React from 'react';

const AuthProvider = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default AuthProvider;