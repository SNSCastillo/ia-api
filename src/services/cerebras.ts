import Cerebras from '@cerebras/cerebras_cloud_sdk';
import type { AIService, ChatMessage } from '@src/const';

const cerebras = new Cerebras();

export const cerebrasService: AIService = {
  name: 'Cerebras',
  async chat(messages: ChatMessage[]) {
    const stream = await cerebras.chat.completions.create({
      messages,
      model: 'zai-glm-4.6',
      stream: true,
      max_completion_tokens: 40960,
      temperature: 0.89,
      top_p: 0.95
  });
  
    return (async function* () {
      for await (const chunk of stream) {
        yield (chunk as any).choices[0].delta.content || '';
      }
    })();
  }
}