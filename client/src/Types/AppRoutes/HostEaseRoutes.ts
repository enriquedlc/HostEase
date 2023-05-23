interface HostEaseRoutes {
  Home: string;
  Login: string;
  Sign: string;
  MainPage: string;
  Explore: string;
  MyEvents: string;
  Profile: string;
  NewEvent: string;
  Admin: string;
  AdminEvents: string;
  AdminUsers: string;
  AdminTags: string;
  AdminCategories: string;
  AdminComments: string;
}

export const HostEaseRoutes: HostEaseRoutes = {
  Home: "/",
  Login: "/login",
  Sign: "/sign",
  MainPage: "/dashboard",
  Explore: "/explore",
  MyEvents: "/events/:id",
  Profile: "/profile/:id",
  NewEvent: "/new",
  Admin: "/admin",
  AdminEvents: "/admin/events",
  AdminUsers: "/admin/users",
  AdminTags: "/admin/tags",
  AdminCategories: "/admin/categories",
  AdminComments: "/admin/comments",
};
