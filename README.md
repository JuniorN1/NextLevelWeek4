# NextLevelWeek4
Nessa Nlw ,tivemos um grande diferencial que são as trilhas específicas para cada área, tivemos as trilhas de React Js , 
Elixir e a Node js que no caso foi a que escolhi , nesse projeto com node js abordamos um sistema de 
NPS (Net Promoter Score) simples porém complexo ao mesmo tempo, utilizando vários conhecimentos como express, typeorm , typescript 
e algumas outras ferramentas que mesmo não citadas aqui, por meio desse texto não deixam de ser menos importantes que as outras.
Nessa Nlw podemos aprofundar mais dentro de cada trilha , aliás um bom pilar se torna uma estrutura firme e forte para um casa!

## Instalação do projeto
	
  va na pasta desejada , abra ou crie uma pasta para salvar o projeto, entre na pasta e abra o terminal,cmd, 
  powerShell ou o da sua preferência, digite o codigo abaixo:
```bash
git clone https://github.com/JuniorN1/NextLevelWeek4.git
```
após baixar os arquivos utilizando o ``` git clone``` entre no diretório criado para isso você pode digitar no seu terminal o comando abaixo:

```bash
cd NextLevelWeek4
```

após você acessar a pasta , deve se instalar as dependências para isso você pode utilizar o npm ou o yarn como exemplo abaixo:

```bash
npm: npm i ou npm install
yarn: yarn add
```

Após você executar um dos comandos acima ele instalará automaticamente as dependências , e tudo estará pronto para começar a utilizar!

## Iniciando o projeto
antes de darmos o yarn dev que estamos usando para iniciar a aplicação devemos iniciar com as migrations , executando os seguintes comandos abaixo:

```bash
npm: npm typerorm migration:run
yarn: yarn typeorm migration:run
```

logo ele irá executá-las e criar seu banco de dados , que no nosso caso está setado como sqlite, 
que coloquei como database.sql que nao tem problema tanto faz por .sql ou .sqlite ira funciona normalmente!
agora sim podemos da o comando ```yarn dev``` ou ```npm dev```, para iniciar a nossa aplicação, abaixo estarei deixando as rotas da aplicação !
<br/>
#### Voce pode esta ultilizando o Insomnia : https://insomnia.rest/download/
<br/>
Rotas:

POST => http://localhost:3333/users
```json
parâmetros {
  "name":"Nome usuario",
  "email":"email@exemple.com"
  }
 ```
 
GET => http://localhost:3333/surveys


POST => http://localhost:3333/surveys
```json
parâmetros {	
	"title":"titulo",
	"description":"description"
}
```


POST => http://localhost:3333/sendMail
```json
parâmetros{
	"email":"email@exemple.com",
	"survey_id":"46ade43b-b3eb-43ca-8e3d-e9e67a21d1c6"	
}
```

GET => http://localhost:3333/answers/nota?u=id
```json
 parâmetros{
  "nota": "0 a 10",
  "u": "46ade43b-b3eb-43ca-8e3d-e9e67a21d1c6"
}
```

GET => http://localhost:3333/nps/:survey_id
```json
 parâmetros{
  "survey_id": "46ade43b-b3eb-43ca-8e3d-e9e67a21d1c6"
  
}
```
<br/>




