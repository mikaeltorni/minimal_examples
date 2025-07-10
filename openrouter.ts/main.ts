import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  throw new Error('OPENROUTER_API_KEY is not set in the .env file');
}

const responsePromise = fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    //'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    //'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openai/gpt-4o',
    messages: [
      {
        role: 'user',
        content: 'What is the meaning of life?',
      },
    ],
  }),
});

responsePromise
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if (
      data &&
      data.choices[0].message.content
    ) {
      console.log("Message:", data.choices[0].message.content);
    } else {
      console.log("No message found in response.");
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });