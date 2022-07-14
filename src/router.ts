import { createWebHistory, createRouter } from "vue-router";

// layouts
import Default from "@/layouts/default.vue";
import Anonymous from "@/layouts/anonymous.vue";

//Views
import Home from "@/views/index.vue"
import Users from "@/views/students.vue"
import Profile from "@/views/profile.vue"
import UserProfile from "@/views/userProfile.vue"
import Employees from "@/views/employees.vue"

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
                path: "/employees",
                component: Employees,
            },
            {
                path: "/profile",
                component: Profile,
            },
            {
                path: "/user/:userId",
                name: "user-profile",
                component: UserProfile,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router }
