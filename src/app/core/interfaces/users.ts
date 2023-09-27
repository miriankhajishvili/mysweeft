export interface IUsers {
  id: number;
  userId?: number;
  firstName: string;
  lastName: string;
  age: number;
  description: string;
  profilePic: string;
  friends: number[]; // Array of user IDs
}
