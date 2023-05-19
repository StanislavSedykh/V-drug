export type SignUpType = {
  image: string;
  name: string;
  email: string;
  password: string;
  score?: number;
};

export type LoginType = {
    name: string;
    password: string;
    score?: number;
}
