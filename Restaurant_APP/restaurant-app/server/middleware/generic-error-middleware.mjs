const genericErrorMiddleware = (err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'A apărut o eroare pe server'
  })
}

export default genericErrorMiddleware