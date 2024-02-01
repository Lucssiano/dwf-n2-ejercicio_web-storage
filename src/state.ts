export const state = {
	data: {},
	listeners: [], // los callbacks
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		this.listeners.forEach((callback) => callback());
		console.log('la data', this.data);
		console.log('listeners', this.listeners);
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
	addItem(item) {
		const currentState = this.getState();
		currentState.list.push(item);
		this.setState(currentState);
	},
	removeItem(item) {
		const currentState = this.getState();
		const newList = currentState.list.filter((el) => el !== item);
		currentState.list = newList;
		this.setState(currentState);
	},
};
