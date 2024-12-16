/* const request = require('supertest')
const app = require('../app')


//Test sur la route post 
it('POST /usersWorkouts/addWorkout', async () => {
    const res = await request(app).post('/usersWorkouts/addWorkout').send({
        user_id: '675c3c14aa253006cc63e936',
        name : 'Seance1',
        exercices : [{
            exercices : {
                _id : '6756b253f510263134c1e580',
                rest : 90,
                customSets : [
                    {_id : '675c3d12aa253006cc63e983'},
                ],
                _id: '675c3d12aa253006cc63e982',
            }
        }]
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
        expect.objectContaining({
            result : true,
            userWorkouts : expect.arrayContaining([
                expect.objectContaining({
                    _id : expect.any(String),
                    name : expect.any(String),
                    exercises : expect.arrayContaining([
                        expect.objectContaining({
                            exercise : expect.objectContaining({
                                _id : expect.any(String),
                                name : expect.any(String),
                                muscleGroupe : expect.any(String),
                                description : expect.any(String),
                                image : expect.any(String),
                            }),
                            rest : expect.any(Number),
                            customSets : expect.arrayContaining([
                                expect.objectContaining({
                                    weight : expect.any(Number),
                                    reps : expect.any(Number),
                                    _id : expect.any(String),
                                }),
                            ]),
                            _id : expect.any(String),
                        }),
                    ]),
                    __v: expect.any(String)
                })
            ])
        })
    )
}) */