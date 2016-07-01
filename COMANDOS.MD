#Imagem base Alpine
docker build -t couldworks/alpine-base:3.4 .

# Imagem base Java com open-jdk-1.8 java 8u92
docker build -t couldworks/java-base:8u92 .

#Imagem jenkins
docker build -t couldworks/jenkins:1.651.3 .

#Imagem node
docker build -t couldworks/nodejs:6.2.0 .

#Imagem Mongo
docker build -t couldworks/mongodb:3.2.4 .
