import Category from "../database/Category";
import CategoryData from "../class/model/CategoryData";
import { IGetCategories, IGetCategoriesByLimit, ICategryDict } from "../definitions/service/category";

class CategoryService {
	public async getCategories(): Promise<IGetCategories> {
		const categoryDict = await this.getCategoryDict();
		return { categoryList: Object.values(categoryDict) };
	}

	public async getCategoriesByLimit(limit: number): Promise<IGetCategoriesByLimit> {
		const categoryList = await Category.getCategoryListByLimit(limit);
		return {
			categoryList: categoryList.map((category) => new CategoryData(category)),
		};
	}

	private async getCategoryDict(): Promise<ICategryDict> {
		const categoryList = await Category.get();
		const categoryDict: ICategryDict = {};
		for (const category of categoryList) {
			const key = category.name;
			if (categoryDict[`${key}`]) {
				categoryDict[`${key}`].addEntryId(category.entryID);
			} else {
				categoryDict[`${key}`] = new CategoryData(category);
			}
		}

		return categoryDict;
	}
}

export default new CategoryService();
