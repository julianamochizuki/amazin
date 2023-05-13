const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(401).json("Unauthorized");
  } else {
    next();
  }
}

const userId = (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    res.status(401).json("Unauthorized");
  } else {
    next();
  }
}


module.exports = {
  isAdmin,
}