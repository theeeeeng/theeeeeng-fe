import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { useUserDispatch, useUserState } from '../context/User';

const HomePage: NextPage = () => {
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    userInfo();
  }, []);

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
        <ProductList products={products.slice(0, 10)} />
        <Pagination />
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
