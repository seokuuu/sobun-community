export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
}

export interface Group {
  id: string;
  title: string;
  description?: string;
  store: string;
  location: string;
}