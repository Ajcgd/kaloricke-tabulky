export default interface SeedFileStructure {
  userCredentials: UserCredentialsDTO[];
  userDetails: UserDetailsDTO[];
  userGoals: UserGoalsDTO[];
  food: FoodDTO[];
  eaten: EatenDTO[];
  user: UserDTO[];
  session: SessionDTO[];
  diaryEntry: DiaryEntryDTO[];
  role: RoleDTO[];
}

export interface UserDTO {
  id: string;
  roleName: string;
}

export interface UserCredentialsDTO {
  email: string;
  userId: string;
  passwordHash: string;
}

export interface UserDetailsDTO {
  username: string;
  name: string;
  surname: string;
  weight: number;
  height: number;
  birthdate: Date;
  sex: number;
  email: string;
  userId: string;
  goalWeight: number;
}

export interface UserGoalsDTO {
  id: string;
  userId: string;
  carbs: number;
  proteins: number;
  fats: number;
  fiber: number;
  salt: number;
  calories: number;
}

export interface FoodDTO {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  salt: number;
  creatorId: string;
}

export interface EatenDTO {
  id: string;
  foodId: string;
  quantity: number;
}

export interface SessionDTO {
  id: string;
  userId: string;
}

export interface DiaryEntryDTO {
  id: string;
  userId: string;
  foodId: string;
  date: Date;
  grams: number;
  mealType: string;
}

export interface RoleDTO {
  name: string;
  canDeleteUsers: boolean;
  canPromoteUsers: boolean;
  canCUDOwnFood: boolean;
  canCUDAnyFood: boolean;
}
