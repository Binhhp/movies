// assets
import { 
    IconDashboard, 
    IconAccessible, 
    IconFolders,
    IconDeviceTv,
    IconBuilding
} from '@tabler/icons';

// constant
const icons = { IconDashboard, IconAccessible, IconFolders, IconDeviceTv, IconBuilding };
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Trang chủ',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Trang chủ',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: true
        },
        {
            id: 'movie',
            title: 'Phim',
            type: 'item',
            url: '/movies',
            icon: icons.IconDeviceTv,
            breadcrumbs: true
        },
        {
            id: 'genres',
            title: 'Thể loại',
            type: 'item',
            url: '/genres',
            icon: icons.IconFolders,
            breadcrumbs: true
        },
        {
            id: 'casts',
            title: 'Diễn viên',
            type: 'item',
            url: '/casts',
            icon: icons.IconAccessible,
            breadcrumbs: true
        },
        {
            id: 'companies',
            title: 'Công ty',
            type: 'item',
            url: '/companies',
            icon: icons.IconBuilding,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
