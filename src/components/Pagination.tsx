import React, { useEffect } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { usePagination } from '../hooks/usePagination';
import { useRouter } from 'next/router';

const Pagination = ({total, onChangePage}: {total: number, onChangePage: (page: number) => void}) => {
  const router = useRouter();
  const {page} = router.query;
  const {current, setCurrent, start, setStart, end, setEnd, maxPage} = usePagination(total);

  useEffect(() => {
    if (page === undefined) {
      setCurrent(1);
    } else if (Number(page) !== current) {
      setCurrent(Number(page));
    }
  }, [page]);

  const handleSelectPage = (page: number) => {
    setCurrent(page);
    onChangePage(page);
  };
  
  const onClickPrev = () => {
    const prevCurrent = Math.floor(current / 5) * 5;
    onChangePage(prevCurrent);
    setCurrent(prevCurrent);
  };

  const onClickNext = () => {
    let nextCurrent = Math.floor(current / 5) * 5 + 6;

    if (nextCurrent > maxPage) {
      nextCurrent = maxPage;
    }
    
    onChangePage(nextCurrent);
    setCurrent(nextCurrent);
  };

  return (
    <Container>
      <Button disabled={start === 1} onClick={onClickPrev}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {
          Array.from({length: (end - start) + 1}, (value, index) => start + index).map((page) => 
            <Page key={page} selected={page === current} disabled={page === current} onClick={() => handleSelectPage(page)}>
              {page}
            </Page>
          )
        }
      </PageWrapper>
      <Button disabled={maxPage === end} onClick={onClickNext}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
