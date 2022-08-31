const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send(`
        <html>
            <body>
                <div id="app">
                    <h1>学习吧</h1>
                    <p class="demo">学习吧还不错</p>
                </div>
            </body>
        </html>
    `);
});

app.listen(3000, () => {
  console.log(`服务运行在http://localhost:3000`);
});
