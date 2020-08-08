import Category from "../database/Category";
import { IGetFrequentUseCategory } from "../definitions/service/category";
import { ICategory } from "../definitions/database/Category";
import EntryCategory from "../database/EntryCategory";

class CategoryService {
	public async getCategories(): Promise<ICategory[]> {
		const categoryList = await Category.get();
		return categoryList;
	}

	public async getCategoriesByLimit(limit: number): Promise<IGetFrequentUseCategory[]> {
		const frequentUseCategoryList = await EntryCategory.getFrequentUseCategory(limit);
		const categoryList = await Category.getByIds(frequentUseCategoryList.map(value => value.categoryId));

		const results: IGetFrequentUseCategory[] = [];
		for (const category of categoryList) {
			const frequentUseCategory = frequentUseCategoryList.find(value => value.categoryId === category.categoryId);
			if (frequentUseCategory) {
				results.push({
					...category,
					count: frequentUseCategory.count,
				});
			}

		}
		return results;
	}
}

export default new CategoryService();
