import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';


// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));
const MRegister = Loadable(lazy(() => import('app/views/pages/machineregister/MRegister')));
const MachineDetails = Loadable(lazy(() => import('app/views/pages/machineDetails')));

// DashBoard page
const DashBoard = Loadable(lazy(() => import('app/views/dashboard/DashBoard/Dashboard.jsx')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const FrontDashboard = Loadable(lazy(() => import('app/views/dashboard/FrontDashboard')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <FrontDashboard />,
        auth: authRoles.admin
      },

      // e-chart route
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      },
      {
        path: '/pages/machineregister/mregister',
        element: <MRegister />,
        auth: authRoles.admin
      },
      // machine details route
      {
          path: 'pages/machineDetails',
          element: <MachineDetails />,
          auth: authRoles.editor
        },
         {
          path: 'views/dashboard/DashBoard/Dashboard',
          element: <DashBoard />,
          auth: authRoles.editor
        },
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },


  { path: '/', element: <Navigate to="/session/signin" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
