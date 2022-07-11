export default interface IFoodRecord {
  name: string;
  id: string;
  description: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  salt: number;
  deleted: boolean;
}
