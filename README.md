
# ia-api

API en Bun y TypeScript que rota entre servicios de IA gratuitos (Groq, Cerebras...) para aprovechar sus capas gratuitas.

## Uso

1. Instala dependencias y ejecuta el servidor:
	```sh
	bun install
	bun run start:dev
	```

2. Envía mensajes al endpoint `/chat`:
	```sh
	curl -X POST http://localhost:3000/chat \
	  -H "Content-Type: application/json" \
	  -d '{ "messages": [ { "role": "user", "content": "Cuentame un chiste de programadores" } ] }'
	```

El servicio se alterna automáticamente entre los proveedores configurados.

## Estructura
- `src/services/`: Implementaciones de Groq y Cerebras
- `src/const/`: Tipos e interfaces comunes
- `src/index.ts`: Servidor principal