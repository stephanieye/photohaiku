class Auth {

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static getPayload() {
    const token = this.getToken();
    if(!token) return null;
    const parts = token.split('.');
    if(parts.length < 3) return null;
    return JSON.parse(atob(parts[1]));
  }

  static isAuthenticated() {
    const payload = this.getPayload();
    if(!payload) return false;
    const now = Math.round(Date.now() / 1000);
    return now < payload.exp;
  }

  static isCurrentUser(user) {
    return this.isAuthenticated() && user._id === this.getPayload().sub;
  }

}

export default Auth;
