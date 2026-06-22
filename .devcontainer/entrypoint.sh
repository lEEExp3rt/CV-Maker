#!/bin/bash
set -e

echo "========================================"
echo "  CV-Maker Dev Container"
echo "========================================"

if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

case "${1}" in
    dev)
        echo "Starting dev server..."
        exec npm run dev
        ;;
    build)
        echo "Building production bundle..."
        exec npm run build
        ;;
    clean)
        echo "Cleaning build artifacts..."
        exec npm run clean
        ;;
    bash)
        exec /bin/bash
        ;;
    *)
        echo "Usage: docker run cv-maker [dev|build|clean|bash]"
        echo "Defaulting to dev server..."
        exec npm run dev
        ;;
esac
