from openai import OpenAI
client = OpenAI(base_url="http://localhost:8000/v1", api_key="not-needed")

resp = client.chat.completions.create(
    model="cpatonn/OpenCodeReasoning-Nemotron-1.1-32B-AWQ-4bit",
    messages=[{"role":"user","content":"Say hello in one sentence."}],
    max_tokens=64,
)
print(resp.choices[0].message.content)
