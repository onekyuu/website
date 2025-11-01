export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  profile: {
    avatar: string;
    role: {
      name: string;
    };
    permissions: Array<{ K: string; V: boolean }>;
  };
}
