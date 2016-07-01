= Imagem base Alpine
docker build -t couldworks/alpine-base:3.4 .
 
= Imagem base Java com open-jdk-1.8 java 8u92
docker build -t couldworks/java-base:8u92 .
 
= Imagem jenkins 
docker build -t couldworks/jenkins:1.651.3 .
 
= criando uma rede docker
docker network create --driver bridge couldworks
 
= listando as rede
docker network ls
 
= verificando estrutura da rede
docker network inspect couldworks
 
= iniciando vários containers na couldworks
docker run -it --rm --net=couldworks --name alpine1 couldworks/alpine-base:3.4 sh
docker run -it --rm --net=couldworks --name alpine2 couldworks/alpine-base:3.4 sh
docker run -it --rm --net=couldworks --name alpine3 couldworks/alpine-base:3.4 sh
 
= linkando dois containers agora suporta restart
docker run -it --rm --net=couldworks --name alpine1 couldworks/alpine-base:3.4 sh
docker run -it --rm --net=couldworks --name alpine2 --link alpine1:alp1 couldworks/alpine-base:3.4 sh

= criação de volumes nomeados
docker create -v $(pwd)/volumes:/volumes --name volumes couldworks/alpine-base:3.4 sh
 
= inicializando container com volume compartilhado
docker run -it --rm --volumes-from volumes --name vol1 couldworks/alpine-base:3.4 sh
docker run -it --rm --volumes-from volumes --name vol2 couldworks/alpine-base:3.4 sh

Referências de comandos do módulo de rede
- https://docs.docker.com/v1.11/engine/userguide/networking/work-with-networks/
