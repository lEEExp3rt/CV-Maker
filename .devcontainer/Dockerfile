FROM node:20-slim

# In mainland China? Uncomment the next line for apt mirror:
# RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources

# Install Chromium for Puppeteer + CJK fonts for Chinese PDF export
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
    fonts-noto-cjk-extra \
    fonts-inter \
    && rm -rf /var/lib/apt/lists/*

# Use system Chromium instead of downloading
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /workspace

# Install dependencies (leveraging layer cache)
COPY package.json package-lock.json* ./
RUN npm install

# Copy project files
COPY . .

EXPOSE 5173

ENTRYPOINT ["/workspace/.devcontainer/entrypoint.sh"]
