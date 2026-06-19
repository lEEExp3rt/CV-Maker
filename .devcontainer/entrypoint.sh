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
    export)
        echo "Building and exporting PDF..."
        exec npm run export
        ;;
    build)
        echo "Building production bundle..."
        exec npm run build
        ;;
    *)
        echo "Starting dev server (default)..."
        exec npm run dev
        ;;
esac
