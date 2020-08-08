import EntryData from "../../class/model/EntryData";
import { IEntries } from "../database/Entries";

export interface IGetEntries {
	entryList: EntryData[];
	entryCount: number;
}

export interface IGetEntry {
	entry: EntryData;
	nextEntry: IEntries;
	backEntry: IEntries;
}

export type IGetEntriesByCategoryName = IGetEntries;