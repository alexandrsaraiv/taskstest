

instalar Mongodb e NodeJS
***********************************************************************************
###################################################################################
npm init -y
npm install express connect-flash bcryptjs express-handlebars express-session method-override mongoose passport passport-local
npm install dotenv nodemon npm-check-updates -D
###################################################################################
***********************************************************************************
###################################################################################
na pasta principal do projeto crie um documento chamado .env com as seguintes linhas:

NOTES_APP_MONGODB_HOST=localhost
NOTES_APP_MONGODB_DATABASE=mobicareDB

###################################################################################
***********************************************************************************
###################################################################################
em package.json adicione dois scripts:

   "start": "node src/index.js",
   "dev": "nodemon src/index.js"
###################################################################################
***********************************************************************************

