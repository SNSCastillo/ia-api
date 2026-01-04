import { groqService } from "./services";
import type { AIService, ChatMessage } from "./const";
import { cerebrasService } from "./services/cerebras";

const services: AIService[] = [
  groqService,
  cerebrasService,
];

let currentServiceIndex = 0;

function getNextService() {
  const service = services[currentServiceIndex];
  currentServiceIndex = (currentServiceIndex + 1) % services.length;
  return service;
}

const server = Bun.serve({
  port: 3000,


  async fetch(request) {
   const {pathname} = new URL(request.url);

    if (pathname === "/chat" && request.method === "POST") {
      
      const {messages} = await request.json() as {messages: ChatMessage[]};

      const service = getNextService();

      console.log(`Using service: ${service && service.name}`);
      const stream = await service?.chat(messages);

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      })
     
    }
    return new Response("Not Found", {status: 404});
  },
});

console.log(`Servidor corriendo en ${server.url}`);