FROM node:18-alpine

# Instalar dependencias necesarias para oracledb
RUN apk add --no-cache libaio libnsl libc6-compat curl unzip

# Descargar Oracle Instant Client
WORKDIR /opt/oracle
RUN curl -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip && \
    unzip instantclient-basiclite.zip && \
    rm -f instantclient-basiclite.zip && \
    cd instantclient* && \
    rm -f *jdbc* *occi* *mysql* *jar uidrvci genezi adrci

# Configurar variables de entorno para Oracle
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_23_26:$LD_LIBRARY_PATH

# Configurar directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
