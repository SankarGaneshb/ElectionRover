# Stage 1: Build the React Frontend
FROM node:20-bullseye AS frontend-builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Final Production Image (FastAPI + Static Frontend)
FROM python:3.13-slim

WORKDIR /app

# Install Backend Dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend source
COPY backend/ ./backend/

# Copy frontend build output from stage 1
COPY --from=frontend-builder /app/dist ./dist

# Set environment variables
ENV PYTHONPATH=/app
ENV PORT=8080
EXPOSE 8080

# Run the FastAPI server
# We will serve the static frontend via FastAPI in main.py
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
