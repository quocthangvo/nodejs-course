
const validator = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property])
        if (!error) {
            next()
        } else {// co lỗi
            // console.log(JSON.stringify(error,null,2))// dùng để kiểm tra all
            const { details } = error
            const message = details[0].message
            const path = details[0].path
            res.status(422).json({
                success: false,
                error: {
                    message, path
                },
            })
        }
    }
}

module.exports = validator