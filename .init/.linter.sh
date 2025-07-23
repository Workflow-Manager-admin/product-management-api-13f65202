#!/bin/bash
cd /home/kavia/workspace/code-generation/product-management-api-13f65202/products_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

