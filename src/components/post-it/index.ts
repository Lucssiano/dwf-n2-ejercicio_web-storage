import { state } from '../../state';

class PostIt extends HTMLElement {
	shadow = this.attachShadow({ mode: 'open' });
	tasks = {
		all: [],
		eliminated: [],
		completed: [],
	};

	constructor() {
		super();
	}

	connectedCallback() {
		state.subscribe(() => this.syncWithState());
		this.syncWithState();
	}

	syncWithState() {
		const lastState = state.getState();
		this.tasks = lastState.tasks;
		// console.log(this.tasks);
		this.render();
	}

	render() {
		const postIts = this.tasks.all;

		this.shadow.innerHTML = `
		<div class="post-it__container">
			${postIts
				.map((postIt) => {
					return `
					<div class="post-it-block">
						<div class="post-it-block__container">
							<div class="post-it-item">${postIt}</div>
							<input type="checkbox" class="post-it-checkbox">
						</div>
						<div class="post-it-trash-container">
							<img src="https://cdn.discordapp.com/attachments/703284067696771083/1202480668018352158/trash-regular-24.png?ex=65cd9c64&is=65bb2764&hm=27a6504e352302e70c0c8d195c69fe04718d71531ff0c5d8f963eb84da5a19bb&" alt="Trash Can Image" class="trash-img">
						</div>
					</div>
				`;
				})
				.join('')}
		</div>
			`;
		/* No me toma la carpeta de imagenes */

		const postItCheckboxs = this.shadow.querySelectorAll('.post-it-checkbox');
		const postItBlocks = this.shadow.querySelectorAll('.post-it-block');

		/* VER SI SE PUEDE SOLUCIONAR QUE CUANDO APRETO UN CHECKBOX TAMBIEN SE MARCA EN NEGRO (es como que toma que apreto el bloque también) */
		/* SEGUN DICE LA CONSIGNA CREO QUE ESTO DEBERIA HACERLO DESDE EL INDEX.TS PRINCIPAL */
		postItCheckboxs?.forEach((postItCheckBox) => {
			postItCheckBox.addEventListener('click', () => {
				const postItItem = postItCheckBox.parentElement?.querySelector('.post-it-item');
				const postItContent = postItItem?.textContent;

				postItItem?.classList.toggle('done');
				postItItem?.classList.contains('done') ? console.log('si') : console.log('no');

				/* No sé que problema hay acá que no lo quiere actualizar, se bugea el renderizado */
				// if (postItItem?.classList.contains('done')) {
				// 	state.addTask(postItContent, 'completed');
				// } else {
				// 	state.removeTask(postItContent, 'completed');
				// }
			});
		});

		postItBlocks?.forEach((postItBlock) => {
			postItBlock.addEventListener('click', () => {
				const postItItem = postItBlock.querySelector('.post-it-item');
				const postItContent = postItItem?.textContent;
				const postItTrashImage = postItBlock.querySelector('.trash-img');

				postItBlock.classList.toggle('active');
				postItTrashImage?.classList.toggle('active');

				postItTrashImage?.addEventListener('click', () => {
					console.log(postItBlock);
					postItBlock?.remove(); // si tienen el mismo nombre se borran las dos
					state.removeTask(postItContent, 'all');
					state.addTask(postItContent, 'eliminated');
					/* No sé que problema hay acá que no lo quiere actualizar, se bugea el renderizado */
					// if (postItItem?.classList.contains('done')) state.removeTask(postItContent, 'completed');
				});
			});
		});

		const style = document.createElement('style');
		style.innerHTML = `
		.post-it__container {
			margin-top: 45px;
			display: grid;
			gap: 20px;
		}
		@media (min-width: 960px) {
			.post-it__container {
				grid-template-columns: repeat(3, 1fr);
			}
		}
		.post-it-block {
        	min-height: 90px;
			overflow: hidden;
        	background-color: #FFF599;
        	border-radius: 4px;
			padding: 20px 12px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			}
			.post-it-block.active {
				border: 3px solid #000;
			}
			.post-it-block__container {
				display: flex;
				justify-content: space-between;
			}
			.post-it-item {
				font-size: 20px;
				max-width: 80%;
			}
			.post-it-item.done {
				text-decoration: line-through;
			}
			.post-it-checkbox {
				width: 25px;
				height: 25px;
			}
			.post-it-trash-container {
				align-self: end;
			}
			.trash-img {
				cursor: pointer;
				display: none;
			}
			.trash-img.active {
				display: inherit;
			}
			`;

		this.shadow.appendChild(style);
	}
}

customElements.define('post-it', PostIt);
