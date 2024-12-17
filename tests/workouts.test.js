const request = require('supertest')
const app = require('../app')

//Test sur la route Get '/workouts'
it('Get /workouts', async () => {
    const res = await request(app).get('/workouts')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
        expect.objectContaining({
            result: true,
            data : expect.arrayContaining([
                expect.objectContaining({
                    _id : expect.any(String),
                    name : expect.any(String),
                    difficulty : expect.any(String),
                    exercices : expect.arrayContaining([
                        expect.objectContaining({
                            _id : expect.any(String),
                            exercice: expect.any(String),
                            rest : expect.any(Number),
                            sets : expect.arrayContaining([
                                expect.objectContaining({
                                    _id : expect.any(String),
                                    weight : expect.any(Number),
                                    rep : expect.any(Number),
                                }),
                            ])
                        })
                    ])
                })
            ])
        })
        )
    })

    //Test sur la route Get '/byDifficulty/:byDifficulty'
it('Get /workouts/byDifficulty/:byDifficulty', async () => {
    const res = await request(app).get('/workouts/byDifficulty/confirme')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
        expect.objectContaining({
            result: true,
            data : expect.arrayContaining([
                expect.objectContaining({
                    _id : expect.any(String),
                    name : expect.any(String),
                    difficulty : expect.any(String),
                    exercices : expect.arrayContaining([
                        expect.objectContaining({
                            _id : expect.any(String),
                            exercice : expect.objectContaining({
                                _id : expect.any(String),
                                name : expect.any(String),
                                muscleGroupe : expect.any(String),
                                description : expect.any(String),
                                image : expect.any(String),
                            }),
                            rest : expect.any(Number),
                            sets : expect.arrayContaining([
                                expect.objectContaining({
                                    _id : expect.any(String),
                                    weight : expect.any(Number),
                                    rep : expect.any(Number),
                                }),
                            ])
                        })
                    ])
                })
            ])
        })
        )
    })

     //Test sur la route Get '/byName/:byName'
it('Get /workouts/byName/:byName', async () => {
    const res = await request(app).get('/workouts/byName/upperbody')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
        expect.objectContaining({
            result: true,
            data : expect.arrayContaining([
                expect.objectContaining({
                    _id : expect.any(String),
                    name : expect.any(String),
                    difficulty : expect.any(String),
                    exercices : expect.arrayContaining([
                        expect.objectContaining({
                            _id : expect.any(String),
                            exercice: expect.any(String),
                            rest : expect.any(Number),
                            sets : expect.arrayContaining([
                                expect.objectContaining({
                                    _id : expect.any(String),
                                    weight : expect.any(Number),
                                    rep : expect.any(Number),
                                }),
                            ])
                        })
                    ])
                })
            ])
        })
        )
    })