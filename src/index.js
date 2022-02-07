const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/order", (req, res) => {
  const { items } = req.body;

  const order = items.map((item) => {
    if (!item.hasOwnProperty("modifications")) {
      return item.name;
    }

    const stringModifications = item.modifications
      .map(({ topping }) => topping)
      .join(" with ");

    return `${item.name} with ${stringModifications}`;
  });

  let total = 0;
  items.forEach((item) => {
    total = total + item.price;
  });

  res.json({ order, total });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
