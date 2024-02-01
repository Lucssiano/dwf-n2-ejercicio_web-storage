import { state } from '../../state';

class PostIt extends HTMLElement {
	shadow = this.attachShadow({ mode: 'open' });

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		// state.subscribe(() => {
		// 	this.render();
		// });
	}

	render() {
		this.shadow.innerHTML = `
				<div class="post-it-block">
					<div class="post-it-block__container">
						<div class="post-it-item">Resolver el desafío</div>
						<input type="checkbox" class="post-it-checkbox">
					</div>
					<div class="post-it-trash-container">
						<img src="https://cdn.discordapp.com/attachments/703284067696771083/1202480668018352158/trash-regular-24.png?ex=65cd9c64&is=65bb2764&hm=27a6504e352302e70c0c8d195c69fe04718d71531ff0c5d8f963eb84da5a19bb&" alt="Trash Can Image" class="trash-img">
					</div>
				</div>
		    `;
		/* No me toma la carpeta de imagenes */

		const postItCheckbox = this.shadow.querySelector('.post-it-checkbox');
		const postItItem = this.shadow.querySelector('.post-it-item');
		const postItBlock = this.shadow.querySelector('.post-it-block');
		const postItTrashImage = this.shadow.querySelector('.trash-img');
		/* Cambiar el icono de la basura porque no se puede usar como un elemento after */

		postItCheckbox?.addEventListener('click', () => {
			postItItem?.classList.toggle('done');
		});

		postItBlock?.addEventListener('click', () => {
			postItBlock.classList.toggle('active');
			postItTrashImage?.classList.toggle('active');

			postItTrashImage?.addEventListener('click', () => {
				postItBlock?.remove();
				/* No sé cómo arreglar que no vaya sumando los gaps */
			});
		});

		const style = document.createElement('style');
		style.innerHTML = `
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
