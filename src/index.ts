const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Hello, Bun!");
  },
});

console.log(`Servidor corriendo en ${server.url}`);