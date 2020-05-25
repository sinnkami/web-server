import { ICategory } from "../../definitions/database/Category";

export interface ICategoryData {
	entryIdList: number[];
	name: string;
	count: number;
}

class CategoryData implements ICategoryData {
	public entryIdList: number[] = [];
	public name: string;
	public count: number;

	public constructor(category: ICategory) {
		this.entryIdList.push(category.entryID);
		this.name = category.name;
		this.count = this.entryIdList.length;
	}

	public addEntryId(entryId: number): void {
		this.entryIdList.push(entryId);
		this.count = this.entryIdList.length;
	}
}

export default CategoryData;
