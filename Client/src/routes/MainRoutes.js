import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));

const Movie = Loadable(lazy(() => import("views/Movie")));
const MovieCreator = Loadable(lazy(() => import("views/Movie/FormControl/FormCreate")));
const MovieUpdate = Loadable(lazy(() => import("views/Movie/FormControl/FormUpdate")));

const Genres = Loadable(lazy(() => import("views/Genres")));
const Casts = Loadable(lazy(() => import("views/Casts")));
const Companies = Loadable(lazy(() => import("views/Companies")));
// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/movies',
            element: <Movie />
        },
        {
            path: '/movies/create',
            element: <MovieCreator />
        },
        {
            path: '/movies/:idMovie',
            element: <MovieUpdate />
        },
        {
            path: '/genres',
            element: <Genres />
        },
        {
            path: '/companies',
            element: <Companies />
        },
        {
            path: '/casts',
            element: <Casts />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
    ]
};

export default MainRoutes;
