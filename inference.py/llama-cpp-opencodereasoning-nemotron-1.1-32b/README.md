# Local llama.cpp Setup for OpenCodeReasoning-Nemotron-1.1-32B

## Target System
- **OS**: Linux
- **GPU**: NVIDIA GPU with CUDA support
- **Requirements**: CUDA-capable drivers installed

## Quick Setup

### Install uv (Optional but Recommended)
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Install Python Dependencies
```bash
uv sync
```

### Build llama.cpp from Source (CUDA on NVIDIA)
```bash
# Clone the repository
git clone https://github.com/ggml-org/llama.cpp.git
cd llama.cpp

sudo apt install cmake -y
cmake -B build -DGGML_CUDA=1 -DCMAKE_BUILD_TYPE=Release -DLLAMA_CURL=OFF
cmake --build build -j
```

Enable Unified Memory on Linux CUDA:
```bash
export GGML_CUDA_ENABLE_UNIFIED_MEMORY=1
```

### Download the 1.1-32B GGUF Q4 Model

```bash
uvx --from huggingface_hub hf download mradermacher/OpenCodeReasoning-Nemotron-1.1-32B-GGUF \
  --include "*Q4_K_M.gguf" \
  --local-dir ~/models/opencodereasoning-nemotron-1.1-32b-gguf
```

### Run with llama-cli (Big Context)

```bash
MODEL=~/models/opencodereasoning-nemotron-1.1-32b-gguf/OpenCodeReasoning-Nemotron-1.1-32B.Q4_K_M.gguf

./build/bin/llama-cli \
  -m "$MODEL" \
  -c 65536 \
  -t $(nproc) \
  -ngl 999 \
  -b 4096 \
  -ubatch 1024 \
  -p "You are Nemotron 1.1 Code Reasoning 32B. Say 'ready' if loaded."
```

### Run the OpenAI-Compatible Server

```bash
MODEL=~/models/opencodereasoning-nemotron-1.1-32b-gguf/OpenCodeReasoning-Nemotron-1.1-32B.Q4_K_M.gguf

./build/bin/llama-server \
  -m "$MODEL" \
  -c 65536 \
  -ngl 60 \
  -b 1024 \
  --flash-attn \
  --no-kv-offload \
  --cache-type-k q8_0 \
  --cache-type-v q4_0 \
  --host 127.0.0.1 \
  --port 8080
```

### Test the Server

#### Health Check with curl
```bash
curl -s http://localhost:8080/v1/chat/completions \
 -H "Content-Type: application/json" \
 -d '{
  "model": "local",
  "messages": [{"role":"user","content":"Confirm 64k context active."}],
  "max_tokens": 64,
  "temperature": 0.2
 }' | jq .
```

#### Run the uv Python client

```bash
uv run python main.py
```
