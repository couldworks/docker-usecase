# Docker Case Study

Este repositório tem como intenção organizar uma apresentação de estudo de caso e
 com uso e organização de containers Docker.

-----

- Aplicação
  - java  spring boot
  - nodejs
  - mongodb
  - cAdvisor
  - jenkins


- Dockerização
  - scripts
  - estrutura de diretórios    
  - CI com jenkins deploy


- Configuração de rede docker
  - bridge    
  - identificação do ambiente


- Organização das imagens
    - SO – Alpine Linux
      - tecnologia
        - ambiente de execução (frameworks) com app
		
	- Padronização de nomes
	
		Imagens base: {ambiente}-{so}-base:{versão} 
			{ambiente} - nome do grupo de imagens, ex: teste, produção, etc.
			{so} - sistema operacional
			{versão} - essa campo pode ser preenchido com a versão do SO, versão da image, grupo de imagens, etc.
			
		Tecnologias base: {ambiente}-{tecnologia}-base:{versão}
			{tecnologia} - nome da tecnologia que a aquela imagem disponibiliza
			
		Tecnologias Uso: {ambiente}-{tecnologia}-{uso}-base:{versão}
			{uso} - algumas tecnologias como bancos possibilitam o uso de shell ou terminais para acesso, além do serviço propriamente dito, essas imagens servem pra isso.

			
- Organização das containers

  - identificação de ambiente, aplicação, serviço
