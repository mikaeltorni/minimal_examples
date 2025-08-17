# CUDA Driver Installation for RTX 4090

This guide provides instructions for installing CUDA drivers on Ubuntu 24.04. This setup was tested using an RTX 4090 GPU.

## Prerequisites

Install required build tools and dependencies:

```bash
sudo apt update
sudo apt install -y build-essential dkms linux-headers-$(uname -r) wget gnupg
```

## Add NVIDIA Repository

Download and install the NVIDIA CUDA repository keyring:

```bash
cd /tmp
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo wget -O /etc/apt/preferences.d/cuda-repository-pin-600 https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-ubuntu2404.pin
sudo apt update
```

## Install CUDA Toolkit

Install the CUDA toolkit and drivers:

```bash
sudo apt install -y cuda
```

## Configure Environment Variables

Add CUDA to your system PATH:

```bash
echo 'export PATH=/usr/local/cuda-13.0/bin:$PATH' | sudo tee /etc/profile.d/cuda.sh
source /etc/profile.d/cuda.sh
```

## Reboot System

Reboot your system to complete the installation:

```bash
sudo reboot
```

## Verification

After reboot, you can verify the installation by running:
```bash
nvidia-smi
```

This should display your RTX 4090 GPU information and driver version:

```
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 580.65.06              Driver Version: 580.65.06      CUDA Version: 13.0     |
+-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 4090        On  |   00000000:01:00.0  On |                  Off |
|  0%   35C    P2             60W /  450W |   2420MiB /  24564MiB  |      5%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
```

# vLLM Setup and Inference

This section covers setting up vLLM for GPT-OSS model inference on RTX 4090.

## Configure CUDA Environment

Set up CUDA 12.8 environment variables:

```bash
export CUDA_HOME=/usr/local/cuda-12.8
export CUDACXX=/usr/local/cuda-12.8/bin/nvcc
export PATH=/usr/local/cuda-12.8/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda-12.8/lib64:${LD_LIBRARY_PATH}

which nvcc
nvcc --version
nvidia-smi
```

## Set Up Python Environment

Create and activate a Python virtual environment:

```bash
uv venv --python 3.12 --seed
source .venv/bin/activate
```

## Configure GPU Architecture

Set the CUDA architecture for RTX 4090 (Ada Lovelace):

```bash
export TORCH_CUDA_ARCH_LIST=8.9
```

## Install PyTorch

Install PyTorch nightly build with CUDA 12.8 support:

```bash
uv pip install --pre torch --index-url https://download.pytorch.org/whl/nightly/cu128
```

## Install vLLM

Install vLLM with GPT-OSS wheels:

```bash
uv pip install --pre vllm==0.10.1+gptoss \
  --extra-index-url https://wheels.vllm.ai/gpt-oss/ \
  --extra-index-url https://download.pytorch.org/whl/nightly/cu128 \
  --index-strategy unsafe-best-match
```

## Clean Cache

Remove any stale caches that might cause issues:

```bash
rm -rf ~/.cache/flashinfer ~/.cache/vllm/torch_compile_cache
```

## Configure Runtime Environment

Set up environment variables for optimal performance:

```bash
# Reduce allocator fragmentation (PyTorch tip shown in your OOM trace)
export PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True

# Optional: free up VRAM by closing Discord/Chrome etc. Check with:
nvidia-smi
```

## Run Inference Server

```bash
export VLLM_ATTENTION_BACKEND=TRITON_ATTN_VLLM_V1
export VLLM_WORKER_MULTIPROC=1
export VLLM_NUM_CPU_THREADS=6

vllm serve openai/gpt-oss-20b \
  --quantization mxfp4 \
  --max-model-len 8192 \
  --max-seq-len-to-capture 4096 \
  --max-num-batched-tokens 512 \
  --gpu-memory-utilization 0.85
```

## Run Inference Client

```bash
uv run main.py
```
