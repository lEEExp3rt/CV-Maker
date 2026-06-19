FROM node:20-slim

# Install Chromium and fonts for Puppeteer PDF export
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    fonts-noto-cjk \
    fonts-inter \
    && rm -rf /var/lib/apt/lists/*

# Tell Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /workspace

# Copy package files and install deps
COPY package.json package-lock.json* ./
RUN npm install

# Copy project files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

ENTRYPOINT ["/workspace/.devcontainer/entrypoint.sh"]
