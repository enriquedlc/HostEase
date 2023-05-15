export type Theme = 'light' | 'dark';

export interface UserContextValue {
	user: User | null;
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
	signUp: (arg0: UserSignUpData) => Promise<boolean>;
	logIn: (arg0: LoginRequest) => Promise<boolean>;
	logOut: () => void;
}

export interface User {
	id: number;
	nickname: string;
	email: string;
	password: string;
	phone: string;
	experience: number;
	joinedAt: string;
	events: HostEaseEvent[];
	achievements: Achievement[];
	messages: Message[];
	followers: number;
}

// Pendiente
//   theme: UserTheme;
// setTheme: React.Dispatch<React.SetStateAction<UserTheme>>

interface Message {
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

interface Category {
	id: number;
	category: string;
}

export interface Tag {
    id: number;
    tag: string;
	color: string
  }
  
  interface HostEaseEvent {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate?: string | null;
    startTime: string;
    endTime?: string;
    locationLat: number;
    locationLng: number;
    maxCapacity: number;
    photo: number;
    tags?: Tag[];
    users?: User[];
    category: Category;
    messages?: Message[];
    likes: number;
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

