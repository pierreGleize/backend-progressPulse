const request = require("supertest");
const app = require("../../app");

it("POST /addWeight", async () => {
  const res = await request(app).post("/users/addWeight").send({
    token: g7KL3b5iBewN9MAQvV446sbgFoxpj1jC,
    weight: 100,
    date: new Date(),
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.stock).toBe({ weight: 100, date: new Date() });
});
