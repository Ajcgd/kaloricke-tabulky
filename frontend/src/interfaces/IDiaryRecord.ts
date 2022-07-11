import IFoodRecord from './IFoodRecord';

import MealType from '../types/MealType';

export default interface IDiaryRecord {
  id: string;
  food: IFoodRecord;
  foodId: string;
  grams: number;
  mealType: MealType;
  userid: number;
}
