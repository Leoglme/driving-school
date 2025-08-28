import { createWebHistory, createRouter } from "vue-router";

// layouts
import Default from "@/layouts/default.vue";
import Anonymous from "@/layouts/anonymous.vue";

//Views
import Home from "@/views/index.vue"
import Users from "@/views/students.vue"
import addStudent from "@/views/addStudent.vue"
import addEmployee from "@/views/addEmployee.vue"
import Account from "@/views/account.vue"
import UserProfile from "@/views/userProfile.vue"
import Employees from "@/views/employees.vue"
import notFound from "@/views/notFound.vue"
import login from "@/views/login.vue"
import forgotPassword from "@/views/forgot-password.vue"
import resetPassword from "@/views/reset-password.vue"
import createPassword from "@/views/create-password.vue"
import { useAuthStore } from "@/stores/auth.store";

// routes
const routes = [
    {
        path: "/",
        component: Default,
        children: [
            {
                path: "/",
                component: Home,
            },
            {
                path: "students",
                component: { template: "<router-view/>" },
                children: [
                    { path: "", name: "students-list", component: Users },
                    { path: "add", name: "students-add", component: addStudent }
                ],
            },
            {
                path: "employees",
                component: { template: "<router-view/>" },
                children: [
                    { path: "", name: "employees-list", component: Employees },
                    { path: "add", name: "employees-add", component: addEmployee }
                ],
            },
            {
                path: "/account",
                component: Account,
            },
            {
                path: "/user/:userId",
                name: "user-profile",
                component: UserProfile,
            },
            {
                path: "/:pathMatch(.*)*",
                name: "not-found",
                component: notFound,
            },
        ],
    },
    {
        path: "/",
        component: Anonymous,
        children: [
            {
                path: "/login",
                component: login,
            },
            {
                path: "/forgot-password",
                component: forgotPassword,
            },
            {
                path: "/reset-password",
                component: resetPassword,
            },
            {
                path: "/create-password",
                component: createPassword,
            },
            {
                path: "/:pathMatch(.*)*",
                name: "not-found",
                component: notFound,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes,
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/forgot-password', '/reset-password', '/create-password'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        await router.push('/login')
    }
});

export { router }
