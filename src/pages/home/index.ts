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
        <post-it title="Hola" checked="true"></post-it>
      </section>
    </div>
  `;

	const postItFormEl = div.querySelector('.post-it-form');
	postItFormEl?.addEventListener('submit', (e) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const inputValue = form?.text.value;
		// state.addTask(inputValue, 'all');
   const prueba = state.getEnabledTasks();
   console.log(prueba)
		form.reset();
	});

	container.appendChild(div);
}
