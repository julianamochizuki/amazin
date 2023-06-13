function getRating(reviews) {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);

  return totalRating / reviews.length;
}

function getFilteredProducts(products, req) {
  products.forEach((product) => {
    let totalReviews = 0;
    let totalRating = 0;
    if (!product.reviews.length) {
      product.averageRating = 0;
      return;
    }
    product.reviews.forEach((review) => {
      totalReviews += 1;
      totalRating += review.rating;
    });
    product.averageRating = totalRating / totalReviews;
  });

  const filteredProducts = products.filter((product) => {
    if (product.isOnSale && product.discountPercent) {
      const discountedPrice =
        product.price_cents -
        (product.price_cents * product.discountPercent) / 100;
      return (
        product.averageRating >= Number(req.query.rating) &&
        discountedPrice >= Number(req.query.min) &&
        discountedPrice <= Number(req.query.max)
      );
    } else {
      return (
        product.averageRating >= Number(req.query.rating) &&
        product.price_cents >= Number(req.query.min) &&
        product.price_cents <= Number(req.query.max)
      );
    }
  });

  return filteredProducts;
}

module.exports = {
  getRating,
  getFilteredProducts,
};
