const request = require("supertest");
const app = require("../app");
const { faker } = require("@faker-js/faker");

//TEST de la route addWeight pour ajouter un poids avec une date
it("POST /addWeight", async () => {
  const res = await request(app).post("/users/addWeight").send({
    token: "MP94fJs7PsEWSWZ3u56dV2vrTEtHjcFX",
    weight: 100,
    date: new Date(),
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(
    expect.objectContaining({
      result: true,
      newWeight: expect.objectContaining({
        weight: 100,
        date: expect.any(String),
      }),
    })
  );
});

// Test de la route changeEmail pour modifier son email

it("Put / changeEmail", async () => {
  const res = await request(app).put("/users/changeEmail").send({
    email: "pierre.38@gmail.com",
    password: "123",
    token: "MP94fJs7PsEWSWZ3u56dV2vrTEtHjcFX",
  });
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(
    expect.objectContaining({
      result: true,
      newEmail: "pierre.38@gmail.com",
    })
  );
});

it("PUT / changeSound", async () => {
  const res = await request(app).put("/users/changeSound").send({
    token: "MP94fJs7PsEWSWZ3u56dV2vrTEtHjcFX",
    newSound: "Silencieux",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(
    expect.objectContaining({
      result: true,
      soundUpdated: "Silencieux",
    })
  );
});

//Test de la route signup pour se créer un nouveau compte
it("POST /signup, doit me créer un nouvelle utilisateur", async () => {
  const res = await request(app).post("/users/signup").send({
    email: faker.internet.email(), // bibliothèque faker permet de genérer des emails et usernames aléatoirement afin de tester correctement la route sans erreur en cas de doublon
    username: faker.internet.username(),
    password: "123",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(
    expect.objectContaining({
      result: true,
      userInfos: expect.objectContaining({
        token: expect.any(String),
        email: expect.any(String),
        username: expect.any(String),
        sound: expect.any(String),
        weight: expect.arrayContaining([]),
        target: expect.objectContaining({}),
      }),
    })
  );
});

//Test de la route signup pour le cas ou un email est déjà utilisé
it("POST / signup doit me renvoyer une erreur si l'email est déjà utilié", async () => {
  const res = await request(app).post("/users/signup").send({
    email: "pierre.38@gmail.com",
    username: "testroute",
    password: "123",
  });
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({
    result: false,
    error: "Email already used",
  });
});

//Test de la route signup pour le cas ou un nom d'utilisateur est déjà utiliser
it("POST / signup doit me renvoyer une erreur si username est déjà utilié", async () => {
  const res = await request(app).post("/users/signup").send({
    email: "testroute@gmail.com",
    username: "pierre",
    password: "123",
  });
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({
    result: false,
    error: "Username already used",
  });
});

// Test de la route signin pour se connecter
it("POST / signin", async () => {
  const res = await request(app).post("/users/signin").send({
    email: "pierre.38@gmail.com",
    password: "123",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({
    result: true,
    userInfos: expect.objectContaining({
      token: expect.any(String),
      email: "pierre.38@gmail.com",
      username: "pierre",
      sound: expect.any(String),
      weight: expect.arrayContaining([]),
      target: expect.objectContaining({}),
    }),
  });
});
