const request = require('supertest')
const app = require('../app')


//Test route Get '/'
it('Get /exercises', async () => {
    const res = await request(app).get('/exercises')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
        expect.objectContaining({
                result : true,
                data : expect.arrayContaining([
                    expect.objectContaining({
                        _id : expect.any(String),
                        name: expect.any(String),
                        muscleGroupe : expect.any(String),
                        description : expect.any(String),
                        image : expect.any(String)
                    })
                ])
            }) 
        )   
})

//Test route Get '/:muscleGroup'
it('Get /exercises', async () => {
    const res = await request(app).get('/exercises/Biceps')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
        expect.objectContaining({
            result : true,
            data : expect.arrayContaining([
                expect.objectContaining({
                    _id : expect.any(String),
                    name: expect.any(String),
                    muscleGroupe : expect.any(String),
                    description : expect.any(String),
                    image : expect.any(String)
                })
            ])
        })
        

    )

})