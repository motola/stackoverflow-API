const notFound = (req, res) => {
     res.status(404).send('Page not Found');
}



module.exports = notFound;