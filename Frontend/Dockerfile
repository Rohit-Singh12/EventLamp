# ---- Build Stage ----
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_BACKEND_URL
ENV NEXT_PUBLIC_API_BACKEND_URL=$NEXT_PUBLIC_API_BACKEND_URL

RUN npm run build

# ---- Production Stage ----
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/jsconfig.json ./
# COPY --from=builder /app/.env.local ./

RUN npm ci --omit=dev --ignore-scripts

EXPOSE 4000

CMD ["npm", "start"]