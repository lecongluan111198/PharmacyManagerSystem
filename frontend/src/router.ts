import Vue from 'vue';
import Router, {Route} from 'vue-router';

import Home from './views/Home.vue';
import NotFound from './views/404.vue';

import store from '@/store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'active',
    linkActiveClass: 'same-active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/hoadon',
            name: 'LichSuHoaDon',
            component: () => import('./views/HoaDon.vue'),
        },
        {
            path: '/hoadon/:id',
            name: "ChiTietHoaDon",
            meta: {
                isModal: true,
            },
            components: {
                default: Home,
                modal_content: () => import('./components/modal_views/ChiTietHoaDon.vue'),
            },
        },
        {
            path: '/report',
            name: "Report",
            component: () => import("./views/Report.vue"),
        },
        {
            path: '/admin',
            name: "Admin",
            component: () => import("./views/Admin/Admin.vue"),
            children: [
                {
                    path: '',
                    name: 'AdminMain',
                    component: ()=>import('./views/Admin/Admin.vue'),
                },
                {
                    path: '/nhanvien',
                    name: 'NhanVien',
                    component: ()=>import('./views/Admin/Nhanvien.vue'),
                },
                {
                    path: '/nhanvien',
                    name: 'NhanVien',
                    component: ()=>import('./views/Admin/Nhanvien.vue'),
                },
                {
                    path: '/nhanvien/:id',
                    name: 'NhanVienDetail',
                    redirect: '/nhanvien/:id/chitiet',
                    children: [
                        {
                            path: 'chitiet',
                            name: 'NhanVienDetail_ChiTiet',
                            component: ()=>import('./views/Admin/NhanVienDetail_ChiTiet.vue'),
                        },
                        {
                            path: 'lichsu',
                            name: 'NhanVienDetail_LichSu',
                            component: ()=>import('./views/Admin/NhanVienDetail_LichSu.vue'),
                        },
                    ],
                },
            ],
        },
        {
            path: '/thuoc',
            name: "Thuoc",
            component: ()=>import('./views/Thuoc/Thuoc.vue'),
        },
        {
            path: '/thuoc/:id',
            name: "ThuocDetail",
            meta: {
                isModal: true,
            },
            components: {
                default: Home,
                modal_content: ()=>import('./views/Thuoc/ThuocDetail.vue'),
            },
        },

        {
            path: '/kho',
            name: 'QuanLyKho',
            component: ()=>import('./views/Kho/Kho.vue'),
        },
        {
            path: '/kho/history',
            name: 'QuanLyKho_LichSu',
            component: ()=>import('./views/Kho/LichSu.vue'),
        },

        {
            path: '/kho/nhap',
            name: 'QuanLyKho_Nhap',
            component: ()=>import('./views/Kho/Nhap.vue'),
        },
        {
            path: '/kho/xuat',
            name: 'QuanLyKho_Xuat',
            component: ()=>import('./views/Kho/Xuat.vue'),
        },


        {
            path: '/provider',
            name: "QuanLyNhaCungCap",
            component: ()=>import('./views/Provider/Provider.vue'),
        },
        {
            path: '/provider/:id',
            name: "ChiTietNhaCungCap",
            meta: {
                isModal: true,
            },
            components: {
                default: Home,
                modal_content: ()=>import('./views/Provider/ProviderDetail.vue'),
            },
        },

        {
            path: '/category',
            name: "QuanLyPhanLoai",
            component: ()=>import('./views/PhanLoai/PhanLoai.vue'),
        },
        {
            path: '/category/:id',
            name: "QuanLyPhanLoai_ChiTiet",
            component: ()=>import('./views/PhanLoai/PhanLoaiChiTiet.vue'),
        },
        {
            path: '/profile',
            name: "Profile",
            component: ()=>import('./views/Profile.vue'),
        },


        {
            path: '*',
            name: "NotFound",
            component: NotFound,
        }
    ]
});

router.beforeEach((to: Route, from: Route, next: Function)=>{
    const isRouteHasModal = to.matched.some((route)=>{
        return route.meta.isModal;
    });

    if (isRouteHasModal) {
        for (const fromMatchedIndex in from.matched) {
            to.matched[fromMatchedIndex].components.default = from.matched[fromMatchedIndex].components.default;
        }
    } else {
        store.state.parentModalPath = to.fullPath;
    }

    next();
});

export default router;
