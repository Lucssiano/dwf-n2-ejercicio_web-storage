type taskType = {
	id: number;
	title: string;
	completed: boolean;
	deleted?: boolean;
};

export const state = {
	data: {
		// tasks: [] as taskType[],
		task: [
			{ id: 1, title: 'item 1', completed: false },
			{ id: 2, title: 'item 2', deleted: true },
			{ id: 3, title: 'item 3', completed: true },
		],
	},
	listeners: [],
	init() {
		// const savedState = localStorage.getItem('state');
		// if (savedState) this.setState(JSON.parse(savedState));
	},
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		this.listeners.forEach((callback) => callback());
		console.log('nueva data', this.data.tasks);
		// localStorage.setItem('state', JSON.stringify(newState)); // Creo que solo con esta línea basta para que se guarde en el localStorage
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
	// addTask(task, type: taskType) {
	// 	const currentState = this.getState();
	// 	currentState.tasks[type].push(task);
	// 	this.setState(currentState);
	// },
	// removeTask(task, type: taskType) {
	// 	const currentState = this.getState();
	// 	const taskToRemove = currentState.tasks[type].find((el) => el === task);
	// 	const indexOfTaskToRemove = currentState.tasks[type].indexOf(taskToRemove);
	// 	currentState.tasks[type].splice(indexOfTaskToRemove, 1);
	// 	this.setState(currentState);
	// },
};
