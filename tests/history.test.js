const request = require("supertest");
const app = require("../app");

let workoutID = ""

it("POST /history/addWorkout", async () => {
  const res = await request(app).post("/history/addWorkout").send({
    date: "2024-12-13T10:44:13.532Z",
    note: 1,
    performances: [{ exercise: "675b0f1461d286899d6ed39d", sets: [{exerciseID: "675b0f1461d286899d6ed39d",weight: 10,reps: 10,rest: 90,}]}],
    ressenti: "Super Séance",
    user: "zP0--hxlrJ6fRDZETiAF30Cwlaa9m57f",
    workout: "675b0f1461d286899d6ed39c",
  });
  workoutID = res.body.workoutAdded._id
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(true);
  expect(res.body.workoutAdded).toEqual({
    _id : expect.any(String),
    date: "2024-12-13T10:44:13.532Z",
    note: 1,
    performances: [{ exercise: "675b0f1461d286899d6ed39d", sets: [{exerciseID: "675b0f1461d286899d6ed39d",weight: 10,reps: 10,rest: 90,}]}],
    ressenti: "Super Séance",
    user: expect.any(String),
    workout: "675b0f1461d286899d6ed39c",
  });
});

it("GET /history/userHistory/:userToken", async () => {
  const res = await request(app).get("/history/userHistory/zP0--hxlrJ6fRDZETiAF30Cwlaa9m57f")

  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(true);
  expect(res.body.workouts).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        date: expect.any(String),
        note: expect.any(Number),
        performances: expect.any(Array),
        ressenti: expect.any(String),
        user: expect.any(String),
        workout: expect.any(String),
      })
    ])
  );
});

it("DELETE /history/deleteWorkout/:WorkoutID", async () => {
  const res = await request(app).delete(`/history/deleteWorkout/${workoutID}`)
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(true);
  exepect(res.body.deletedCount).toBe(1)
})