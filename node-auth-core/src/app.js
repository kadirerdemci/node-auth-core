const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
const morgan = require("morgan");

const { handleErrors } = require("./middlewares/errorMiddleware");
const routes = require("./routes");
const { swaggerUi, specs } = require("./swagger");
const credentials = require("../src/middlewares/credentials");
const corsOptions = require("./config/cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));



app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  })
);

app.use("/api", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(handleErrors);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
