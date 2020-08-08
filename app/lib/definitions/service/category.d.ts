import { ICategory } from "../database/Category";

export interface IGetFrequentUseCategory extends ICategory {
	count: number;
}