import { app } from "./src/app.js"

(function() {
  const port = process.env.PORT ?? 3000
  app.listen(port, ()=>{console.log("SERVER ON PORT ", port);})
})();
