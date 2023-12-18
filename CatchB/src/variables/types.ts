export type UserProfile = {
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  date_joined: string;
}

export type Todo = {
  id: number;
  title: string;
  done: boolean;
}
