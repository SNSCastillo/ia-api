import { OpenRouter } from '@openrouter/sdk';
import type { AIService, ChatMessage } from '@src/const';

const openRouter = new OpenRouter();

export const openRouterService: AIService = {
  name: 'OpenRouter',

  async chat(messages: ChatMessage[]) {

    const chatCompletion = await openRouter.chat.send({
      messages,
      model: 'allenai/olmo-3.1-32b-think:free',
      maxTokens: 2048,
      "stream": true,
       
    });

  return (async function* () { 
      for await (const chunk of chatCompletion) {
        const content = chunk.choices?.[0]?.delta?.content;
        yield content ?? '';
      }
    })();
  }
}
