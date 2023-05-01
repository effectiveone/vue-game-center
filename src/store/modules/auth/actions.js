export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url = 'http://localhost:5002/api/auth/login';

    if (mode === 'signup') {
      url = 'http://localhost:5002/api/auth/register';
    }

    let requestBody = {
      mail: payload.email,
      password: payload.password,
    };

    if (mode === 'signup') {
      requestBody.username = payload.username;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    console.log('responseData', responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    localStorage.setItem('token', responseData.token);
    localStorage.setItem('userId', responseData.userId);
    // localStorage.setItem('tokenExpiration', expirationDate);

    const userDetails = {
      token: responseData.token,
      userId: responseData.userId,
    };
    context.commit('setUser', userDetails);

    // Dodanie tokena do res.userDatails
    const res = {
      userDatails: userDetails,
    };
    return res;
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    // const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });

      // Dodanie tokena do res.userDatails
      const res = {
        userDatails: {
          token: token,
          userId: userId,
        },
      };
      return res;
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // localStorage.removeItem('tokenExpiration');

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
