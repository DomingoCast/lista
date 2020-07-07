exports.getIngredients = (req, res, next) => {
    res.status(200).json({
        posts: [{title: 'wasap', content: 'me rayo con mi theme'}]
    })

}

exports.postIngredients = (req, res, next) => {
    const title = req.body.title
    const content = req.body.content
    res.status(201).json({
        message: "succesfully added post",
        posts: [{id: new Date().toISOString(), title: title, content: content}]
    })

}
