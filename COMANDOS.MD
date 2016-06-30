 #Imagem base Alpine
 docker build -t couldworks/alpine-base:3.4 .
 
 # Imagem base Java com open-jdk-1.8 java 8u92
 docker build -t couldworks/java-base:8u92 .
 
 #Imagem jenkins 
 docker build -t couldworks/jenkins:1.651.3 .
 
 # criando uma rede docker
 docker network create --driver bridge couldworks
 
 # listando as rede
 docker network ls
 
 # verificando estrutura da rede
 docker network inspect couldworks
 
 