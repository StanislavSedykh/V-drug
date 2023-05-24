export type ImageUpload = {
  name?: string | null,
  type?: string,
  uri: string
}

export type SignUpType = {
  image: ImageUpload;
  name: string;
  email: string;
  password: string;
  score?: number;
};

export type LoginType = {
  email: string;
  password: string;
  score?: number;
};

export type UsersTypes = {
  id: number;
  name: string;
  email: string;
  image: string;
}