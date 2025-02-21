require("dotenv").config();

const app = require("./src/app");

app.listen(3000, () => {
  console.log(
    `Server is running on port 300 and the site is http://localhost:3000`
  );
});
