export interface UserData {
  _id: string;
  _v: number;
  fname: string;
  lname: string;
  location: string;
  email: string;
  role: string;
}

export interface UserLoader {
  user: UserData;
}
