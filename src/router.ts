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
                path: "/students",
                component: Users,
            },
            {
                path: "/student/add",
                component: addStudent,
            },
            {
                path: "/employees",
                component: Employees,
            },
            {
                path: "/employee/add",
                component: addEmployee,
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
                path: "/:pathMatch(.*)*",
                name: "not-found",
                component: notFound,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router }
