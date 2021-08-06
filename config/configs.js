const { env } = process;
const dotenv = require("dotenv");
dotenv.config();
//stores the environment passed by the command line (fe.NODE_ENV=development (local) or NODE_ENV=productive (server))
const config = {
  env: env.NODE_ENV || "development",
};
//configuration parameters for the local environment
//const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kgubn.mongodb.net/blogs?retryWrites=true&w=majority`;
const connectionString =
  "mongodb+srv://Sara:Test1234@cluster0.4z6q6.mongodb.net/blog?retryWrites=true&w=majority";
const devConfig = {
  db: connectionString,
  jwt_key: "FbW43-2-110%",
};
//configuration parameters for the productive environment
const prodConfig = {
  //Using PROD_recordShop as a productive database on the same mongodb cluster
  db:
    //using a difeerent jwt key for the productive environment
    "mongodb+srv://Kinjal:test1234@cluster0.kgubn.mongodb.net/PROD_blogs?retryWrites=true&w=majority",
  jwt_key: "PROD_FbW43-2-110%",
};
//choose the devConfig or prodConfig depending on the config.env value
const currentConfig = config.env === "productive" ? prodConfig : devConfig;
//export the env, db and jwt_key
module.exports = Object.assign({}, config, currentConfig);
