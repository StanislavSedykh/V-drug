export type LoggedUserType = {
  status: 'logged';
} & BackendUserType;

export type BackendUserType = {
  id: number;
  username: string;
};

export type GuestUserType = {
  status: 'guest';
};

export type FetchingUserType = {
  status: 'fetching';
};

export type UserType = LoggedUserType | GuestUserType | FetchingUserType;
