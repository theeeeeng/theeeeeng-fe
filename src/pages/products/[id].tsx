import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import {Product} from '../../types/product';
import NotFound from '../../components/NotFound';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>();

  useEffect(() => {
    const {query} = router;
    if (query.id) {
      productDetail(Number(query.id));
    }
  }, [router]);

  const productDetail = (id: number) => {
    const detail = fetch(`https://api.sixshop.com/products/${id}`).then(res => res.json()).then(({data}) => {
      if (!data) {
        setProduct(null);
        return;
      }
      const {product: detail} = data;
      setProduct(detail);
    }).catch(error => {
      console.log(error);
      setProduct(null);
    });
  };

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      {
        product &&
          <>
            <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} alt={`${product.name}의 상품 이미지`}/>
            <ProductInfoWrapper>
              <Name>{product.name}</Name>
              <Price>{product.price.toLocaleString()}원</Price>
            </ProductInfoWrapper>
          </>
      }
      {
        !product && <NotFound/>
      }
    </>
  );
};

export default ProductDetailPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
