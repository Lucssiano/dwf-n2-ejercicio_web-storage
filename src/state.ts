type taskType = {
	id: number;
	title: string;
	completed: boolean;
	deleted?: boolean;
};

export const state = {
	data: {
		tasks: [] as taskType[],
	},
	listeners: [],
	init() {
		// localStorage.removeItem('state');
		const savedState = localStorage.getItem('state');
		if (savedState) this.setState(JSON.parse(savedState));
	},
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		this.listeners.forEach((callback) => callback());
		// console.log('nueva data', this.data.tasks);
		localStorage.setItem('state', JSON.stringify(newState));
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
	getEnabledTasks() {
		const currentState = this.getState();
		return currentState.tasks.filter((t: taskType) => !t.deleted);
	},
	addTask(task: taskType) {
		const currentState = this.getState();
		currentState.tasks.push(task);
		this.setState(currentState);
	},
	moveTaskToBeggining(task: taskType) {
		const currentState = this.getState();
		const taskIndex = currentState.tasks.findIndex((t: taskType) => t.id === task.id);
		currentState.tasks.splice(taskIndex, 1);
		currentState.tasks.unshift(task);
		this.setState(currentState);
	},
	moveTaskToEnd(task: taskType) {
		const currentState = this.getState();
		const taskIndex = currentState.tasks.findIndex((t: taskType) => t.id === task.id);
		currentState.tasks.splice(taskIndex, 1);
		currentState.tasks.push(task);
		this.setState(currentState);
	},
	changeTaskStatus(taskId, checked: boolean) {
		const currentState = this.getState();
		/* taskId me está trayendo un string a pesar de ser un number, tuve que hacer el parseInt debido a eso */
		const task = currentState.tasks.find((t) => t.id === parseInt(taskId));
		task.completed = checked;
		this.setState(currentState);
	},
	deleteTask(taskId) {
		const currentState = this.getState();
		const task = currentState.tasks.find((t) => t.id === parseInt(taskId));
		task.deleted = true;
		this.setState(currentState);
	},
};
