import React from 'react';
import WriteReview from '../../components/NewReview';
import { ProductType } from '../../types/types';

type Props = {
  currentProduct: ProductType;
};

export default function NewReview(props: Props) {
  const { currentProduct } = props;
  return <WriteReview currentProduct={currentProduct} />;
}
