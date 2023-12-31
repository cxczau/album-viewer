import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { ImageContainer, PageContainer, SliderContainer } from "../styled";
import { ALBUMS_API_ROUTE } from "../constants/httpRoutes";

const Carousel = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    fetch(`${ALBUMS_API_ROUTE}/1/photos?page=${page}`)
      .then(response => response.json())
      .then(json => {
        const { data, last, total } = json;
        setData(data);
        setTotalCount(total);
        setLastPage(last);
      })
  }, [page]);

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [data]);

  const handleImgClick = (index) => {
    setCurrentImgIndex(index);
  }

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    setPage(page - 1);
  }

  return (
    <PageContainer>
      <div>
        <h1>Album View</h1>
        <p>Found {totalCount || '0'} photos for Album 1</p>
        <p>Click on the thumbnail to see the zoomed in version</p>
      </div>
      <SliderContainer>
        <Button onClick={handlePrevPage} disabled={page < 1}>
          <ChevronLeftIcon />
        </Button>
        <ImageList cols={10}>
          {!!data?.length && data.map((item, index) => (
            <ImageItem key={item.id} onClick={() => handleImgClick(index)}>
              <img
                srcSet={`${item.thumbnailUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.thumbnailUrl}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageItem>
          ))}
        </ImageList>
        <Button onClick={handleNextPage} disabled={page >= (lastPage - 1)}>
          <ChevronRightIcon />
        </Button>
      </SliderContainer>
      <div>
        <p>{page + 1} of {lastPage}</p>
      </div>
      {data[currentImgIndex] && (
        <ImageContainer>
          <img src={data[currentImgIndex]?.url} alt={data[currentImgIndex]?.title} />
        </ImageContainer>
      )}
    </PageContainer>
  );
}

export const ImageItem = styled(ImageListItem)`
  cursor: pointer;
`;

export default Carousel;