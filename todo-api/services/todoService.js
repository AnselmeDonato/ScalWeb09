import {postgres} from "../deps.js";

const sql = postgres({});

const getTodos = async (_request, _mappingResult) => {
	const todos = await sql`SELECT * FROM todos`;
	return Response.json(todos); 
};

const addTodo = async (request, _mappingResult) => {
  let item;
  try {
    const jsonData = await request.json();
    item = jsonData.item.trim();
  } catch (e) {
	console.log(e); 
    return new Response("Bad request", { status: 400 });
  }

  if (!item || item.length === 0) {
    return new Response("Bad request", { status: 400 });
  }

  await sql`INSERT INTO todos (item) VALUES (${ item })`;
  return new Response("OK", { status: 200 });
};

const delTodo = async (_request, mappingResult) => {
  const id = mappingResult.pathname.groups.id;
  const todos = await sql`SELECT * FROM todos WHERE id = ${ id }`;

  if (todos.length == 0) {
	  return new Response("Id to delete not found", { status: 404 });
  }

  await sql`DELETE FROM todos WHERE id = ${ id }`
  return new Response("OK", { status: 200 });
};

export { getTodos, addTodo, delTodo }; 