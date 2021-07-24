// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
const colores:any[] = []

app.post("/", async (req) => {
  const body = await req.formData();
  let color = body.value("color")
  colores.push(color)

  console.log(colores);

  await req.redirect('/')
});

app.handle("/", async (req) => {
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html; charset=UTF-8",
      }),
      body:ReactDOMServer.renderToString(
        <html>
          <head>
            <meta charSet="utf-8" />
            <title>servest</title>
          </head>
          <body>
          <form action="/" method="post">
            <label>Ingrese un color en inglés</label>
            <input type="text" name="color" />
            <button>Enviar</button>
          </form>
          <ul>
          {
            colores.map( color => 
            <li style={{color}}>
              <b>{color}</b>
            </li>)
          }
          </ul>
          </body>
        </html>
      ),
    });
});



app.listen({ port: 8080 });