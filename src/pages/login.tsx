import Link from 'next/link';
import type { NextPage } from 'next';
import React, {useState, useRef, useEffect, ChangeEvent} from 'react';
import styled from 'styled-components';
import { LoginError, LoginForm } from '../types/login';

const LoginPage: NextPage = () => {
  const [form, setForm] = useState<LoginForm>({
    id: '',
    password: ''
  });
  const [error, setError] = useState<LoginError>({
    id: undefined,
    password: undefined
  });

  const handleChange = (type: 'id' | 'password', event: ChangeEvent<HTMLInputElement>) => {
    if (type === 'id') {
      const id = event.target.value;
      setForm({id, password: form.password});
    } else if (type === 'password') {
      const password = event.target.value;
      setForm({id: form.id, password});
    }

  };

  const handleBlur = (type: 'id' | 'password') => {
    if (type === 'id') {
      setError({id: check('id') ? '' : '올바른 아이디 형식으로 입력해주세요.', password: error.password});
    } else if (type === 'password') {
      setError({id: error.id, password: check('password') ? '' : '올바른 비밀번호 형식으로 입력해주세요.'});
    }
  };

  const check = (type: 'id' | 'password'): boolean => {
    if (type === 'id') {
      return (form.id.length > 0 && /^[A-za-z0-9]{5,30}/.test(form.id));
    } else if (type === 'password') {
      return (form.password.length > 0 && /^[A-za-z0-9]{8,30}$/.test(form.password));
    }
    return false;
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
      <Form>
        <FieldTitle>아이디</FieldTitle>
        <TextInput type='text' minLength={5} maxLength={30} value={form.id} error={!!error.id} onChange={(e) => handleChange('id', e)} onBlur={() => handleBlur('id')}/>
        {
          !!error.id && <ErrorText>{error.id}</ErrorText>
        }
        <FieldTitle>비밀번호</FieldTitle>
        <TextInput type='password' minLength={8} maxLength={30} value={form.password} error={!!error.password} onChange={(e) => handleChange('password', e)} onBlur={() => handleBlur('password')}/>
        {
          !!error.password && <ErrorText>{error.password}</ErrorText>
        }
        <LoginButton disabled={error.id === undefined || !!error.id || error.password === undefined || !!error.password}>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;
const FieldTitle = styled.div`
  margin-top: 8px;
  font-weight: 700;
  font-size: 13px;
  color: #6C6C7D;
`;

const TextInput = styled.input<{error: boolean}>`
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;

  background: ${prop => prop.error ? '#FDEDEE' : '#F7F7FA'};
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;

const ErrorText = styled.p`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ED4E5C;
`;