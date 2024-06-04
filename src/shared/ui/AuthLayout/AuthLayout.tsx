import { Container } from './AuthLayout.styles.ts';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <Container>{children}</Container>;
};

export default AuthLayout;
