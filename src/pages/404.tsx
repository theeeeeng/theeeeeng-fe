import type { NextPage } from 'next';
import NotFound from '../components/NotFound';
import Link from 'next/link';
import styled from 'styled-components';

const NotFoundPage: NextPage = () => {
    return <>
        <Header>
            <Link href='/'>
            <Title>HAUS</Title>
            </Link>
            <Link href='/login'>
            <p>login</p>
            </Link>
        </Header>
        <Container>
            <NotFound/>
        </Container>
    </>;
};

export default NotFoundPage;

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
