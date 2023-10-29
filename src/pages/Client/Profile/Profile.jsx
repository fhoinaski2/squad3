import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

function Profile() {
    const {user,onLoadUser} = useAuth();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadUser = async () => {
            await onLoadUser();
            setIsLoading(false);
        };

        if (isLoading) {
            loadUser();
        }
    }, [isLoading, onLoadUser]);
    return ( 
        <div>
            Bem vindo {user.fullName}
        </div>
     );
}

export default Profile;