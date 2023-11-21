<script>
	let item = "";
	const getTodos = async () => {
	  const response = await fetch("/api/todos");
	  return await response.json();
	};
  
	let todosPromise = getTodos();
	
	const addTodo = async () => {
		if (item.length == 0) {
			return; 
		}
		
		const newTodo = { item }; 
		
		await fetch("/api/todos", {
			method: "POST", 
			body: JSON.stringify(newTodo), 
		}); 
		
		item = "";

		todosPromise = getTodos();
	};

	const delTodo = async (id) => {
		const response = await fetch(`/api/todos/${id}`, {method: "DELETE"});

		todosPromise = getTodos();
	}
  </script>
  
  <h1>Items</h1>
  
  <h1>Todos</h1>
  
  <input type="text" bind:value={item} />
  <button on:click={addTodo}>Add todo</button>
  
  {#await todosPromise}
  <p>Loading items</p>
  {:then todos}
  {#if todos.length == 0}
	  <p>No items available</p>
	  {:else}
	  <ul>
		  {#each todos as todo}
		  <li>
			  {todo.item}
			  <button on:click={() => delTodo(todo.id)}>Delete todo</button>
		</li>
		{/each}
	  </ul>
	{/if}
  {/await}