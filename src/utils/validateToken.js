import jwtDecode from 'jwt-decode';
import typeUserEnum from '../constants/enums/typeUserEnum';

class ValidateToken {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  async validate() {
    return !!this.token && (await !!this.isExpiredToken()); 
  }

  async getToken() {
    
    if (await this.validate()) {
      return this.token;
    } else {
      throw new Error('Invalid or expired token');
    }
  }

  async isExpiredToken() {
    const decoded = await this.decodeToken();
    if (!decoded) return true;

    return decoded.exp * 1000 < Date.now();
  }

  async decodeToken() {
    if (!this.token) return null;

    try {
      const decoded = jwtDecode(this.token);
   
      
      if (!this.isValid(decoded)) return null;

      return decoded;
    } catch {
        throw new Error('Invalid or expired token')
    }
  }

  isValid(decoded) {

    const validRoles = [typeUserEnum.ADMIN, typeUserEnum.BUYER];

    // Verifica se contém os campos esperados
    if(!decoded.id || !decoded.email || !decoded.role) {
      return false;
    }
  
    // Verifica se o role é válido
    if(!validRoles.includes(decoded.role)) {
      return false;
    }
  
    // Verifica expiração 
    if(decoded.exp * 1000 < Date.now()) {
       return false;
    }
  
    return true;
  
  }

}

const validateToken = new ValidateToken();

export default validateToken;