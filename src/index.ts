import './components/post-it';
import { state } from './state';

const postItFormEl = document.querySelector('.post-it-form');
postItFormEl?.addEventListener('submit', (e) => {
	e.preventDefault();
	const form = e.target as HTMLFormElement;
	const inputValue = form?.text.value;
	state.addTask(inputValue, 'all');
	form.reset();
});
