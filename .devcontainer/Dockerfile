FROM node:22-slim

# Install CJK fonts for Chinese rendering
RUN apt-get update && apt-get install -y --no-install-recommends \
    fonts-noto-cjk \
    fonts-noto-cjk-extra \
    fonts-inter \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 5173

ENTRYPOINT ["/workspace/.devcontainer/entrypoint.sh"]
