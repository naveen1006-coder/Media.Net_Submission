#!/bin/bash

# Demo script for MediaNet-AdOS
# Starts the development server in MOCK_MODE

echo "🚀 Starting MediaNet-AdOS Demo..."
echo ""
echo "Demo URLs available:"
echo "  - demo-coffee"
echo "  - demo-fashion"
echo "  - demo-bakery"
echo "  - demo-fitness"
echo ""
echo "Starting development server..."
echo ""

export MOCK_MODE=true
npm run dev
