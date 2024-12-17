const request = require("supertest");
const app = require("../app");

let workoutID = "";

it("POST /histories/addWorkout", async () => {
  const res = await request(app)
    .post("/histories/addWorkout")
    .send({
      date: "2024-12-13T10:44:13.532Z",
      note: 1,
      performances: [
        {
          exercise: "6756b253f510263134c1e580",
          sets: [{ weight: 10, reps: 10, rest: 90 }],
        },
      ],
      ressenti: "Super Séance",
      user: "zP0--hxlrJ6fRDZETiAF30Cwlaa9m57f",
      workout: "675b0f1461d286899d6ed39c",
    });
  workoutID = res.body.workoutAdded._id;
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(true);
  expect(res.body.workoutAdded).toEqual({
    _id: expect.any(String),
    date: "2024-12-13T10:44:13.532Z",
    note: 1,
    performances: expect.any(Array),
    ressenti: "Super Séance",
    workoutName: expect.any(String),
    workoutID: expect.any(String),
  });
});

it("GET /histories/:userToken", async () => {
  const res = await request(app).get(
    "/histories/zP0--hxlrJ6fRDZETiAF30Cwlaa9m57f"
  );

  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(true);
  expect(res.body.histories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        date: expect.any(String),
        note: expect.any(Number),
        performances: expect.any(Array),
        ressenti: expect.any(String),
        workoutName: expect.any(String),
        workoutID: expect.any(String),
      }),
    ])
  );
});

it("DELETE /histories/deleteWorkout/:historyID", async () => {
  const res = await request(app).delete(`/histories/${workoutID}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(true);
  expect(res.body.deletedCount).toBe(1);
});
