#!/bin/bash
set -e

echo "========================================"
echo "  CV-Maker Dev Container"
echo "========================================"

# Install dependencies if node_modules missing
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Run based on first argument
case "${1}" in
    dev)
        echo "Starting dev server..."
        exec npm run dev
        ;;
    build)
        echo "Building production bundle..."
        exec npm run build
        ;;
    export)
        echo "Building and exporting PDF..."
        exec npm run export
        ;;
    clean)
        echo "Cleaning build artifacts..."
        exec npm run clean
        ;;
    bash)
        exec /bin/bash
        ;;
    *)
        echo "Usage: docker run cv-maker [dev|build|export|clean|bash]"
        echo "Defaulting to dev server..."
        exec npm run dev
        ;;
esac
