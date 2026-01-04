import type { ChatMessage } from "./type.const";

/**
 * Todos los servicio utilizan este mismo contrato.
 */
export interface AIService {
  name: string;
  chat: (messages: ChatMessage[]) => Promise<AsyncIterable<string>>;
};