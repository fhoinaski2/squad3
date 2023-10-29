import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import typeUserEnum from '../constants/enums/typeUserEnum';
import PropTypes from 'prop-types';

function PrivateRoute({ children, accessControl }) {
    const [isLoading, setIsLoading] = useState(true);
    const { user, onLoadUser } = useAuth();

    useEffect(() => {
        const loadUser = async () => {
            await onLoadUser();
            setIsLoading(false);
        };

        if (isLoading) {
            loadUser();
        }
    }, [isLoading, onLoadUser]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
console.log(accessControl)
    if (!user) {
       
        if (accessControl && accessControl.includes(typeUserEnum.ADMIN)) {
            return <Navigate to="/login/admin" />;
        } else {
            return <Navigate to="/login/user" />;
        }
    }

    if (accessControl && !accessControl.includes(user.role)) {
       
        return <Navigate to="/unauthorized" />;
    }

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    accessControl: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
