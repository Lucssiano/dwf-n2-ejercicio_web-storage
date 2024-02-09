class PostIt extends HTMLElement {
	shadow: ShadowRoot;
	title: string;
	// id: number; /* No entiendo por qué no me deja agregar un id tipo number */
	checked: boolean;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.title = this.getAttribute('title') || '';
		this.checked = this.hasAttribute('checked');
		this.id = this.getAttribute('id') || '';

		this.render();
	}

	render() {
		this.shadow.innerHTML = `
				<div class="post-it__container">
						<div class="post-it-block ${this.checked ? 'checked' : ''}">
								<div class="post-it-block__container">
									  <h4 class="post-it-item ${this.checked ? 'checked' : ''}">${this.title}</h4>
										<input type="checkbox" class="post-it-checkbox" ${this.checked ? 'checked' : ''}>
								</div>
								<div class="post-it-trash-container">
										<img src="https://cdn.discordapp.com/attachments/703284067696771083/1202480668018352158/trash-regular-24.png?ex=65cd9c64&is=65bb2764&hm=27a6504e352302e70c0c8d195c69fe04718d71531ff0c5d8f963eb84da5a19bb&" alt="Trash Can Image" class="trash-img">
								</div>
						</div>
				</div>
				`;

		const postItCheckbox = this.shadow.querySelector('.post-it-checkbox');
		postItCheckbox?.addEventListener('click', (e) => {
			const target = e.target as HTMLInputElement;
			const event = new CustomEvent('checkedChange', {
				detail: {
					id: this.id,
					checked: target.checked,
				},
			});
			this.dispatchEvent(event);
		});

		const postItBlock = this.shadow.querySelector('.post-it-block');
		const postItTrashImage = this.shadow.querySelector('.trash-img');

		postItBlock?.addEventListener('click', () => {
			postItBlock.classList.toggle('active');
			postItTrashImage?.classList.toggle('active');
			postItTrashImage?.addEventListener('click', (e) => {
				postItBlock.remove();
				const event = new CustomEvent('delete', {
					detail: {
						id: this.id,
					},
				});
				this.dispatchEvent(event);
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
				margin: 0;
				font-size: 20px;
				max-width: 80%;
			}
			.post-it-item.checked {
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
