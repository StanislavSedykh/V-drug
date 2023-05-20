export type SignUpType = {
  image: string;
  name: string;
  email: string;
  password: string;
  score?: number;
};

export type LoginType = {
    email: string;
    password: string;
    score?: number;
}

export type UserType = {
    id: number;
    name: string;
    score?: number;
}