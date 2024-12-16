# Используем официальный минимальный образ Node.js для сборки
FROM node:16-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Собираем приложение
RUN npm run build

# Используем минимальный образ Nginx для раздачи статического контента
FROM nginx:alpine

# Копируем сборку в директорию Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомный конфиг Nginx, если нужно (опционально)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
