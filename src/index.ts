import './components/post-it';
import './pages/home';
import { initHomePage } from './pages/home';
import { state } from './state';

(function main() {
	state.init();
	const root = document.querySelector('.root');
	initHomePage(root);
})();
