const routes = [
    {
      path: '/',
      component: <Home />,
      exact: true,
      authRequired: false, 
    },
    {
      path: '/about',
      component: <About />,
      authRequired: false, 
    },
    {
      path: '/contact',
      component: <Contact />,
      authRequired: false, 
    },
    {
      path: '/dashboard',
      component: <Dashboard />,
      authRequired: false, 
    },
    {
      path: '/profile',
      component: <Profile />,
      authRequired: false, 
    }
  ];
  
  export default routes;
  