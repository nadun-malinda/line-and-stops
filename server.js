const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.listen(port, () => console.log("Listenig on port ", port));

app.get("/sorted", (req, res) => {
  fs.readFile("data/sorted.json", (err, data) => {
    if (err) throw err;
    res.send({
      data: JSON.parse(data),
    });
  });
});

app.post("/save", (req, res) => {
  fs.writeFile("data/sorted.json", JSON.stringify(req.body.data), (err) => {
    if (err) throw err;

    console.log("Sorted data successfully saved!");
  });

  res.send({ message: "Ok" });
});
