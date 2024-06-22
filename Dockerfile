# 使用特定版本的node作为基础镜像
FROM node:22.2.0

# 将工作目录设置为 /wong-news
WORKDIR /wong-news

# 将当前目录下的所有文件复制到工作目录中
COPY . /wong-news

# 安装pnpm
RUN npm install -g pnpm

# 使用pnpm安装依赖项，只安装生产环境的依赖
RUN pnpm i --prod

# 暴露3000端口
EXPOSE 3000

# 构建Next应用
RUN npx next build

# 启动Next应用
CMD ["npx", "next", "start"]