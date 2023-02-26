import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Product } from '../types/product';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { name, thumbnail, price, id } }: ProductItemProps) => {
  const router = useRouter();

  return <>
    <Container onClick={() => router.push(`/products/${id}`)}>
      <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} alt={`${id}번 상품의 썸네일`}/>
      <Name>{name}</Name>
      <Price>{price.toLocaleString()}원</Price>
  </Container>
  </>
};

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;

  $:hover {
    cursor: pointer;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
