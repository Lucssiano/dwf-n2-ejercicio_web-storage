import { state } from '../../state';

export function initHomePage(container) {
	const div = document.createElement('div');
	div.innerHTML = `
    <header class="header"></header>
    <div class="content-container">
      <main class="main">
        <h1 class="main__title">Mis pendientes</h1>
      </main>

      <section class="form-container">
        <form class="post-it-form">
          <div class="post-it__form-input-container">
            <label for="form-input" class="post-it-form__label">Nuevo pendiente</label>
            <input type="text" name="text" id="form-input" class="post-it-form__input" placeholder="Agregá un post-it"
              required>
          </div>
          <button class="post-it-form__button">Agregar</button>
        </form>
      </section>

      <section class="post-it__section">
      </section>
    </div>
  `;

	const postItFormEl = div.querySelector('.post-it-form');

	postItFormEl?.addEventListener('submit', (e) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const currentState = state.getState();
		const inputValue = form?.text.value;
		const task = {
			id: currentState.tasks.length + 1,
			title: inputValue,
			completed: false,
		};
		state.addTask(task);
		form.reset();
	});

	const postItSectionEl = div.querySelector('.post-it__section');
	function createTasks(tasks) {
		if (postItSectionEl) postItSectionEl.innerHTML = '';
		for (const task of tasks) {
			const postIt = document.createElement('post-it');
			postIt.setAttribute('id', task.id);
			postIt.setAttribute('title', task.title);
			if (task.completed) postIt.setAttribute('checked', 'true');
			postItSectionEl?.appendChild(postIt);

			postIt.addEventListener('checkedChange', (e) => {
				const event = e as any;
				state.changeTaskStatus(event.detail.id, event.detail.checked);
			});

			postIt.addEventListener('delete', (e) => {
				const event = e as any;
				state.deleteTask(event.detail.id);
			});
		}
	}

	state.subscribe(() => {
		createTasks(state.getEnabledTasks());
	});

	createTasks(state.getEnabledTasks());

	container.appendChild(div);
}
