FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Cài đặt Expo CLI
RUN npm install -g expo-cli

# Sao chép toàn bộ mã nguồn
COPY . .

# Thiết lập biến môi trường từ file .env
ENV API_URL=http://192.168.1.4:1014
ENV PAYMENT_URL=http://192.168.1.4:8888

# Mở cổng cho Expo
EXPOSE 19000 19001 19002

# Khởi động ứng dụng
CMD ["npm", "start"]