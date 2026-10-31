// src/services/assistantService.js
import { mockAIQuery } from './mockAdapter';

const USE_MOCK = true;

export const assistantService = {
  query: (text, context = {}) => USE_MOCK
    ? mockAIQuery(text)
    : fetch('/api/assistant/query', {
        method: 'POST',
        body: JSON.stringify({ text, context }),
        headers: { 'Content-Type': 'application/json' },
      }).then(r => r.json()),
};
