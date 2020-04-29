import React from 'react';
import { Route, Link } from 'react-router-dom';

interface MenuLinkProps {
    to: string;
    label: string;
}

export default function MenuLink({ to, label }: MenuLinkProps) {
    return (
        <Route
            path={to}
            children={() => {
                return <Link to={to}>{label}</Link>;
            }}
        />
    );
}
