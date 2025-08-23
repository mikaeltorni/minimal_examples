import requests

# Simple test request
data = {
    "model": "local",
    "messages": [{"role": "user", "content": "Write a Python function to calculate fibonacci numbers."}],
    "max_tokens": 256,
    "temperature": 0.2
}

response = requests.post(
    "http://localhost:8080/v1/chat/completions",
    headers={"Content-Type": "application/json"},
    json=data
)

result = response.json()
print(result["choices"][0]["message"]["content"])
