import { createWebHistory, createRouter } from "vue-router";

// layouts
import Default from "@/layouts/default.vue";
import Anonymous from "@/layouts/anonymous.vue";

//Views
import Home from "@/views/index.vue"
import Users from "@/views/students.vue"
import Profile from "@/views/profile.vue"

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
                path: "/profile",
                component: Profile,
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router }
