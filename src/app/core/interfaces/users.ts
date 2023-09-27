export interface IUsers {
  id: number;
  userId?: number;
  firstName: string;
  lastName: string;
  age: number;
  description: string;
  profilePic: string;
  friends: string[]; // Add this property to represent an array of user IDs as friends
}
