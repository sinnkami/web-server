import CategoryData from "../../class/model/CategoryData";

export interface ICategryDict {
	[name: string]: CategoryData;
}

export interface IGetCategories {
	categoryList: CategoryData[];
}

export interface IGetCategoriesByLimit {
	categoryList: CategoryData[];
}
