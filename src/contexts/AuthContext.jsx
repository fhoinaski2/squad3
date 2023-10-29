import { createContext, useState } from 'react';
import { loginAdmin, loginUser } from '../Services/api';
import validateToken from '../utils/validateToken';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
      });
    
    
    
    const onLoadUser = async () => {
        try {
            const decoded = await validateToken.decodeToken();
            if (decoded) {
                setUser(decoded);
            } else {
                logout();
            }
        } catch (error) {
            logout();
        }
    };




    const adminLogin = async (email, password) => {

        const response = await loginAdmin(email, password);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            return { status: response.status };
        }
       
    }

    const userLogin = async (email, password) => {

        const response = await loginUser(email, password);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            return { status: response.status };
        }

        return response;
    }

    function logout() {
        localStorage.removeItem('token');
        setUser(null);
    }

    
    const addToCart = (item) => {

        const updatedCart = [...cart]; 
      
        updatedCart.push(item); 
      
        setCart(updatedCart); 
      
        localStorage.setItem('cart', JSON.stringify(updatedCart)); 
      
      }


    return (
        <AuthContext.Provider
            value={{
                adminLogin,
                userLogin,
                user,
                onLoadUser,
                logout,
                cart,
                addToCart,

            }}
        >
            {children}
        </AuthContext.Provider>
    )


}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

