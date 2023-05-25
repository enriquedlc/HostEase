interface HostEaseRoutes {
  Home: string;
  Login: string;
  Sign: string;
  MainPage: string;
  Explore: string;
  MyEvents: string;
  EventProfile: string;
  Profile: string;
  NewEvent: string;
  EditEvent: string;
  Admin: string;
}

export const HostEaseRoutes: HostEaseRoutes = {
  Home: "/",
  Login: "/login",
  Sign: "/sign",
  MainPage: "/dashboard",
  Explore: "/explore",
  MyEvents: "/events/:id",
  EventProfile: "/event/:id",
  Profile: "/profile/:id",
  NewEvent: "/new",
  EditEvent: "/edit/:id",
  Admin: "/admin",
};
