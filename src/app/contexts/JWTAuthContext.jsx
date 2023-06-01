import { createContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MatxLoading } from 'app/components';
import firebase from '../../fake-db/db/firebasekey';

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      Cookies.remove('user');
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
  register: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
        // const response = await axios.post('/api/auth/login', { email, password });
        const firebaseUser = await firebase.auth().signInWithEmailAndPassword(email, password);

        const dbemail = firebaseUser.user.email;
        const user = { ...firebaseUser.user, name: dbemail };
        const user2 = {
        "avatar": "/assets/images/avatars/001-man.svg",
        "email": dbemail,
        "name": dbemail,
        }
        // Set user data in cookies
        Cookies.set('user', JSON.stringify(user2));

        dispatch({ type: 'LOGIN', payload: { isAuthenticated: true, user: user } });
    } catch(error) {
        setError('Email and password do not match');
        //console.log("Email and password do not match");
        alert('Email and password do not match');
     }
  };

  const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', { email, username, password });
    const { user } = response.data;

    dispatch({ type: 'REGISTER', payload: { user } });
  };

  const logout = () => {
    Cookies.remove('user');
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    (async () => {
      try {
//         const { data } = await axios.get('/api/auth/profile');
//         console.log(data.user);
//         dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: data.user } });
        const storedUser = Cookies.get('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          console.log(user);
          dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: user } });
        } else {
          dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
