# Local vLLM Setup for OpenCodeReasoning-Nemotron-1.1-32B-AWQ-4bit

## Target System
- **OS**: Linux
- **GPU**: NVIDIA GPU with 24 GB VRAM (e.g., RTX 4090)
- **Requirements**: CUDA-capable drivers installed

## Quick Setup

### 1. Create & Activate Environment

Using uv (recommended):
```bash
uv venv -p 3.12
. .venv/bin/activate
```

### 2. Install Packages

```bash
uv pip install -U "vllm[flashinfer]==0.10.1.1"
```

### 3. Download & Serve the Model

```bash
pkill -f "vllm.entrypoints.openai.api_server|python -m vllm" || true

export PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True
export VLLM_ATTENTION_BACKEND=FLASHINFER

python -m vllm.entrypoints.openai.api_server \
  --model cpatonn/OpenCodeReasoning-Nemotron-1.1-32B-AWQ-4bit \
  --tokenizer nvidia/OpenCodeReasoning-Nemotron-1.1-32B \
  --quantization compressed-tensors \
  --dtype bfloat16 \
  --max-model-len 6144 \
  --max-num-batched-tokens 6144 \
  --max-num-seqs 1 \
  --gpu-memory-utilization 0.90 \
  --swap-space 16
```

### 4. Test the Server

#### Minimal Health Check (curl)
```bash
curl -s http://localhost:8000/v1/chat/completions \
 -H "Content-Type: application/json" \
 -d '{
  "model": "cpatonn/OpenCodeReasoning-Nemotron-1.1-32B-AWQ-4bit",
  "messages": [{"role":"user","content":"ping"}],
  "max_tokens": 16
 }' | jq .
```
