import * as todoService from "./services/todoService.js"; 
import { cacheMethodCalls } from "./util/cacheUtil.js";

const cachedtodoService = cacheMethodCalls(todoService, ["addTodo", "delTodo"]); //Breaks everything for some reason...

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos" }),
    // fn: todoService.getTodos,
    fn: cachedtodoService.getTodos,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/todos" }),
    // fn: todoService.addTodo,
    fn: cachedtodoService.addTodo,
  },
  {
    method: "DELETE",
    pattern: new URLPattern({ pathname: "/todos/:id" }),
    // fn: todoService.delTodo,
    fn: cachedtodoService.delTodo,
  },
];

const handleRequest = async (request) => {
	const mapping = urlMapping.find(
	  (um) => um.method === request.method && um.pattern.test(request.url)
	);
  
	if (!mapping) {
	  return new Response("Not found", { status: 404 });
	}
  
	const mappingResult = mapping.pattern.exec(request.url);
	try {
    return await mapping.fn(request, mappingResult);
	} catch (e) {
	  console.log(e);
	  return new Response(e.stack, { status: 500 }); 
	}
};

console.log("starting"); 
const portConfig = { port: 7777, hostname: '0.0.0.0'}; 
Deno.serve(portConfig, handleRequest);