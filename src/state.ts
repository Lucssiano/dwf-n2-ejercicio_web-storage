type taskType = 'all' | 'eliminated' | 'completed';

export const state = {
	data: {
		tasks: {
			all: [],
			eliminated: [],
			completed: [],
		},
	},
	listeners: [],
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		// localStorage.setItem('state', JSON.stringify(newState)); // Creo que solo con esta línea basta para que se guarde en el localStorage
		this.listeners.forEach((callback) => callback());
		console.log('nueva data', this.data.tasks);
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
	addTask(task, type: taskType) {
		const currentState = this.getState();
		currentState.tasks[type].push(task);
		this.setState(currentState);
	},
	removeTask(task, type: taskType) {
		const currentState = this.getState();
		const taskToRemove = currentState.tasks[type].find((el) => el === task);
		const indexOfTaskToRemove = currentState.tasks[type].indexOf(taskToRemove);
		currentState.tasks[type].splice(indexOfTaskToRemove, 1);
		this.setState(currentState);
	},
};
