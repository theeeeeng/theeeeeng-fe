import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { useUserDispatch, useUserState } from '../context/User';

const HomePage: NextPage = () => {
  const router = useRouter();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const { page } = router.query;
  const [productList, setProductList] = useState({
    products: [],
    totalCount: 0
  });

  useEffect(() => {
    userInfo();
  }, []);

  useEffect(() => {
    productsByPage(page ? Number(page) : 1);
  }, [page]);

  const userInfo = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const user = fetch(`https://api.sixshop.com/users/${userId}`).then(res => res.json()).then(({data}) => {
        const {user} = data;
        userDispatch({type: 'LOGIN', data: {...user}});
      }).catch(error => {
        console.log(error);
        alert('유효하지 않은 토큰입니다. 로그아웃 처리됩니다.');
        logout();
      });
    }
  };

  const logout = () => {
    userDispatch({type: 'LOGOUT', data: undefined});
  };

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    logout();
  };

  const productsByPage = (page: number) => {
    const list = fetch(`https://api.sixshop.com/products?page=${page}&size=10`).then(res => res.json()).then(({data}) => {
      setProductList({...data});
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {
          userState ? 
            <span onClick={onLogout}>{userState.name}<br/>logout</span>
            :
            <Link href='/login'><span>login</span></Link>
        }
      </Header>
      <Container>
        <ProductList products={productList.products} />
        <Pagination total={productList.totalCount} onChangePage={(page) => router.push({query: {page}})}/>
      </Container>
    </>
  );
};

export default HomePage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
