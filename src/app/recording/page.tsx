"use client";

import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/path-to-your-ocean-background-image.jpg') no-repeat center center/cover;
  color: #fff;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const ContentBox = styled.div`
  background: rgba(0, 51, 102, 0.8);
  padding: 20px 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
`;

const Header = styled.h1`
  font-size: 2.5em;
  margin-bottom: 15px;
  color: #00bfff;
`;

const TextBox = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const LinkButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background: #00bfff;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: #009acd;
  }
`;

const Page = () => {
  return (
    <PageContainer>
      <ContentBox>
        <Header>World Engine Simulation</Header>
        <TextBox>Click the link below to view the recording of the world engine simulation.</TextBox>
        <LinkButton href="https://your-link-to-the-recording.com" target="_blank">View Recording</LinkButton>
      </ContentBox>
    </PageContainer>
  );
};

export default Page;
