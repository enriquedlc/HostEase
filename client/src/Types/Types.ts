export type Theme = "light" | "dark";

export interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  signUp: (arg0: UserSignUpData) => Promise<boolean>;
  logIn: (arg0: LoginRequest) => Promise<string | null>;
  logOut: () => void;
  getUserEvents: () => void;
  isLoaded: boolean;
}

export type ModeOptions = "form" | "view";
export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
// @ts-ignore Estos dos tipos fallan por algun motivo en algunos equipos (aun haciendo npm i)
export type MapOptions = google.maps.MapOptions;
// @ts-ignore 
export type MapMouseEvent = google.maps.MapMouseEvent;

export type MapLibraries =
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization";

export interface MapProperties {
  coordinates?: LatLngLiteral | null;
  setCoordinates?: HostEaseHandlerFunction;
  handleDbClick?: HostEaseHandlerFunction;
  center?: boolean;
  mode?: ModeOptions;
  name: string
}

export interface EventOwner {
  id: number;
  nickname: string;
  email: string;
  phone: string;
  followers: number;
}

export interface User {
  id: number;
  nickname: string;
  email: string;
  password: string;
  phone: string;
  experience: number;
  joinedAt: string;
  events?: HostEaseEvent[];
  achievements?: Achievement[];
  messages?: Message[];
  followers?: number;
  role: "ADMIN" | "USER";
}

// Pendiente
//   theme: UserTheme;
// setTheme: React.Dispatch<React.SetStateAction<UserTheme>>

export interface Message {
  id: number;
  message: string;
  publishedAt: string;
  event: HostEaseEvent;
  user: User;
}

interface Achievement {
  id: number;
  achievement: string;
  xpPoints: number;
}

export interface Category {
  id: number;
  categoryName: string;
}

export interface Tag {
  id: number;
  tag: string;
  color: string;
}

export type HostEaseHandlerFunction = (date: File | string | LatLngLiteral | Date | Category | Tag[] | number | null, name: string) => void

export interface HostEaseEventForm {
  [key: string]: any;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: LatLngLiteral | null;
  maxCapacity?: number;
  tags?: Tag[];
  category?: Category;
}

export interface HostEaseEvent extends HostEaseEventForm {
  id: number;
  users: number;
  messages?: number;
  likes: number;
  owner: EventOwner;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserSubmit {
  nickname: string;
  phone: string;
  email: string;
  password: string;
}

export interface UserSignUpData extends UserSubmit {
  confirmPass: string;
}
