interface HostEaseRoutes {
  Home: string;
  Login: string;
  Sign: string;
  MainPage: string;
  Explore: string;
  MyEvents: string;
  Profile: string;
  NewEvent: string;
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
};
