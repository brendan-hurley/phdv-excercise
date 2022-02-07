const fetch = require("node-fetch");

describe("Be able to create an order", () => {
  // order a large pepperoni pizza
  it("should allow us to create an order with a single item", async () => {
    const order = [
        {
            starters: [],
            pizzas: [
                {
                    id: "LARGE_PEPPERONI_PIZZA",
                    additions: [],
                    subtractions: []
                },
                {
                    id: "CUSTOM_UUID",
                    additions: [],
                    subtractions: []

                }
            ],
            desserts: [],
            drinks: []
        }
    ]


    const order = [
      {
        id: 1,
        name: "Large Pepperoni Pizza",
        price: 599,
      },
    ];

    const response = await fetch("http://localhost:3000/order", {
      method: "post",
      body: JSON.stringify({ items: order }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    expect(data).toEqual({ order: ["Large Pepperoni Pizza"], total: 599 });
  });

  // order a medium pepperoni pizza, a medium cheese feast pizza and an extra-large custom pizza with no cheese and all the vegetarian toppings
  it("should allow us to create an order with multiple items", async () => {
    const order = [
      {
        id: 1,
        name: "Large Pepperoni Pizza",
        price: 599,
      },
      {
        id: 2,
        name: "Medium cheese feast pizza",
        price: 599,
      },
      {
        id: 3,
        name: "Extra-large custom pizza",
        modifications: [
          {
            topping: "Cheese",
            type: "subtraction",
          },
          {
              SKU
            topping: "All Vegetarian Toppings",
            type: "addition",
          },
        ],
        price: 899,
      },
    ];

    const response = await fetch("http://localhost:3000/order", {
      method: "post",
      body: JSON.stringify({ items: order }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    expect(data).toEqual({
      order: [
        "Large Pepperoni Pizza",
        "Medium cheese feast pizza",
        "Extra-large custom pizza with Cheese with All Vegetarian Toppings",
      ],
      total: 2097,
    });
  });
});

// describe('Be able to add to an order', () => {
//     it('should allow us to add to an order', () => {
//         // test here
//     })
// })

// describe('Be able to add a voucher to an order', () => {
//     it('should allow us to add to an order', () => {
//         // test here
//     })
// })
