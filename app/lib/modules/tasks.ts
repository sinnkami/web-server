import requireDir from "require-dir";
import { Job } from "node-schedule";

class Tasks {
	public jobList: { [path: string]: Job };
	constructor() {
		this.jobList = requireDir("../tasks");
	}
}
export default new Tasks();
