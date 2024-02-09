class t extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.title=this.getAttribute("title")||"",this.checked=this.hasAttribute("checked"),this.id=this.getAttribute("id")||"",this.render()}render(){this.shadow.innerHTML=`
				<div class="post-it__container">
						<div class="post-it-block ${this.checked?"checked":""}">
								<div class="post-it-block__container">
									  <h4 class="post-it-item ${this.checked?"checked":""}">${this.title}</h4>
										<input type="checkbox" class="post-it-checkbox" ${this.checked?"checked":""}>
								</div>
								<div class="post-it-trash-container">
										<img src="https://cdn.discordapp.com/attachments/703284067696771083/1202480668018352158/trash-regular-24.png?ex=65cd9c64&is=65bb2764&hm=27a6504e352302e70c0c8d195c69fe04718d71531ff0c5d8f963eb84da5a19bb&" alt="Trash Can Image" class="trash-img">
								</div>
						</div>
				</div>
				`;let t=this.shadow.querySelector(".post-it-checkbox");t?.addEventListener("click",t=>{let e=t.target,s=new CustomEvent("checkedChange",{detail:{id:this.id,checked:e.checked}});this.dispatchEvent(s)});let e=this.shadow.querySelector(".post-it-block"),s=this.shadow.querySelector(".trash-img");e?.addEventListener("click",()=>{e.classList.toggle("active"),s?.classList.toggle("active"),s?.addEventListener("click",t=>{e.remove();let s=new CustomEvent("delete",{detail:{id:this.id}});this.dispatchEvent(s)})});let i=document.createElement("style");i.innerHTML=`
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
			`,this.shadow.appendChild(i)}}customElements.define("post-it",t);const e={data:{tasks:[]},listeners:[],init(){let t=localStorage.getItem("state");t&&this.setState(JSON.parse(t))},getState(){return this.data},setState(t){this.data=t,this.listeners.forEach(t=>t()),console.log("nueva data",this.data.tasks),localStorage.setItem("state",JSON.stringify(t))},subscribe(t){this.listeners.push(t)},getEnabledTasks(){return this.getState().tasks.filter(t=>!t.deleted)},addTask(t){let e=this.getState();e.tasks.push(t),this.setState(e)},moveTaskToBeggining(t){let e=this.getState(),s=e.tasks.findIndex(e=>e.id===t.id);e.tasks.splice(s,1),e.tasks.unshift(t),this.setState(e)},moveTaskToEnd(t){let e=this.getState(),s=e.tasks.findIndex(e=>e.id===t.id);e.tasks.splice(s,1),e.tasks.push(t),this.setState(e)},changeTaskStatus(t,e){let s=this.getState();s.tasks.find(e=>e.id===parseInt(t)).completed=e,this.setState(s)},deleteTask(t){let e=this.getState();e.tasks.find(e=>e.id===parseInt(t)).deleted=!0,this.setState(e)}};e.init(),function(t){let s=document.createElement("div");s.innerHTML=`
    <header class="header"></header>
    <div class="content-container">
      <main class="main">
        <h1 class="main__title">Mis pendientes</h1>
      </main>

      <section class="form-container">
        <form class="post-it-form">
          <div class="post-it__form-input-container">
            <label for="form-input" class="post-it-form__label">Nuevo pendiente</label>
            <input type="text" name="text" id="form-input" class="post-it-form__input" placeholder="Agreg\xe1 un post-it"
              required>
          </div>
          <button class="post-it-form__button">Agregar</button>
        </form>
      </section>

      <section class="post-it__section">
      </section>
    </div>
  `;let i=s.querySelector(".post-it-form");i?.addEventListener("submit",t=>{t.preventDefault();let s=t.target,i=e.getState(),a=s?.text.value,d={id:i.tasks.length+1,title:a,completed:!1};e.addTask(d),s.reset()});let a=s.querySelector(".post-it__section");function d(t){for(let s of(a&&(a.innerHTML=""),t)){let t=document.createElement("post-it");t.setAttribute("id",s.id),t.setAttribute("title",s.title),s.completed&&t.setAttribute("checked","true"),a?.appendChild(t),t.addEventListener("checkedChange",t=>{e.changeTaskStatus(t.detail.id,t.detail.checked),t.detail.checked?e.moveTaskToEnd(s):e.moveTaskToBeggining(s)}),t.addEventListener("delete",t=>{e.deleteTask(t.detail.id)})}}e.subscribe(()=>{d(e.getEnabledTasks())}),d(e.getEnabledTasks()),t.appendChild(s)}(document.querySelector(".root"));
//# sourceMappingURL=index.ce7769d9.js.map
