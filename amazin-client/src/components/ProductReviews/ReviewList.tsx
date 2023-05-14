import React from 'react';
import { ProductType } from '../../types/types';
import ReviewListItem from './ReviewListItem';

type Props = {
  currentProduct: ProductType;
};

export default function ReviewList(props: Props) {
  const { currentProduct } = props;
  const { reviews } = currentProduct;

  const categoryLists = reviews.map((r) => {
    return <ReviewListItem key={r.id} review={r} />;
  });

  return <>{categoryLists}</>;
}
