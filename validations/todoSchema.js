const Joi = require('./joi')

const contentschema = Joi.string().min(5).required()

const createTodoSchema = Joi.object({
    content: contentschema
})

const idSchema = Joi.object({
    id: Joi.objectId()

})

const updateTodoSchema = Joi.object({
    content: contentschema
})
module.exports = {
    createTodoSchema,
    idSchema
} 