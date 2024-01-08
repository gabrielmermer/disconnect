import { defineEventHandler } from 'h3';
import https from 'https';

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    let body = '';

    event.node.req.on('data', chunk => {
      body += chunk.toString();
    });

    event.node.req.on('end', () => {
      const { message } = JSON.parse(body);

      const requestData = JSON.stringify({
        model: "gpt-4-1106-preview",
        messages: [{ "role": "user", "content": message }]
      });

      const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const gptResponse = JSON.parse(data);
            const reply = gptResponse.choices[0].message.content;
            resolve({ message: reply });
          } catch (error) {
            reject({ error: 'Error processing OpenAI response' });
          }
        });
      });

      req.on('error', (error) => {
        reject({ error: 'Request error' });
      });

      req.write(requestData);
      req.end();
    });
  });
});