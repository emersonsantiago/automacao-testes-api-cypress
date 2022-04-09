const Joi = require ('Joi')

const usuariosSchema = Joi.object({

    quantidade: Joi.number(),
    message: Joi.string(),
    _id: Joi.string(),
    usuarios: Joi.array().items({
        nome: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        administrador: Joi.string(),
        _id: Joi.string()
    })
    
})

export default usuariosSchema;