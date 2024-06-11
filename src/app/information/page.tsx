"use client";

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const archivoBlackFontUrl = "https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap";

const PageContainer = styled.div`
  @import url('${archivoBlackFontUrl}');
  font-family: 'Archivo Black', sans-serif;
`;

const jumpUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
`;

const HeroContent = styled.div`
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 4em;
  animation: ${jumpUp} 1s ease-out forwards;
`;

const InfoSection = styled.section`
  padding: 50px;
  background: #fff;
  color: #333;
  font-size: 1.2em;
  line-height: 1.6;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const TextContent = styled.div`
  width: 55%;
  margin-right: 50px;
`;

const GalleryContent = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const GalleryTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  transition: transform 0.3s, opacity 0.3s;
`;

const GalleryArrow = styled.div`
  cursor: pointer;
  user-select: none;
  font-size: 2em;
  margin: 10px 0;
`;

const SmallImage = styled.img`
  width: 60%;
  height: auto;
  max-height: 100px;
  object-fit: contain;
  opacity: 0.5;
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5em;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const images = [
  '/stat1.png',
  '/stat2.png',
  '/stat3.png',
  '/stat4.png',
];

const InformationPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <PageContainer>
      <HeroSection>
        <VideoBackground autoPlay muted loop>
          <source src="/fishfood.mp4" type="video/mp4" />
        </VideoBackground>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>FISH FOR FOOD</HeroTitle>
        </HeroContent>
      </HeroSection>
      <InfoSection>
        <TextContent>
          <Title>SCENARIO</Title>
          <Paragraph>
            We need to imagine a world where we significantly reduce carbon emissions, by shifting our primary protein source from beef to fish. The current state of beef production poses a substantial problem, with an average carbon footprint of about <BoldText>22,000 kg of CO2</BoldText> equivalent per ton of beef produced. According to David Wallace-Wells, Greenpeace has estimated that the world needs to cut its meat and dairy consumption in half by 2050 to avoid significant climate disaster.
          </Paragraph>
          <Paragraph>
            Beef production alone accounts for almost <BoldText>10% of global carbon emissions</BoldText>, making it a significant contributor to climate change. The global population is projected to approach <BoldText>10 billion</BoldText> by 2050, significantly increasing the demand for protein. If we continue with current practices, the environmental impact will be catastrophic, it is imperative we act now as it is a major driver of deforestation, a significant source of greenhouse gas emissions, and a massive drain on water resources. Continuing this practice threatens our climate, our forests, and our future.
          </Paragraph>
          <Paragraph>
            Addressing this issue is critical, yet it is not straightforward. Beef is deeply ingrained in many cultures and economies, providing millions of jobs worldwide. Due to this, we need to find another way to sustain almost 10 billion people by 2050.
          </Paragraph>
          <Paragraph>
            In order to compensate, an additional <BoldText>160 million metric tonnes</BoldText> of fish would need to be produced annually. This is hard to address due to the fact that the current rate of salmon production would need to skyrocket, as the current production is approximately 2.5 million metric tonnes.
          </Paragraph>
          <Paragraph>
            Our solution is to create large-scale fish farm vessels, which will be zoned and maintained in three locations: Norway, Chile, and Canada. These countries will become hubs that will facilitate the world's new demand for fish, leveraging their geographical advantages to serve different consumer markets.
          </Paragraph>
          <Paragraph>
            While transitioning to fish farming is far more sustainable it requires significant investment in advanced aquaculture systems. We’ll also require sustainable fish feed to mitigate pollution due to uneaten feed and fish waste while ensuring we use renewable energy sources. Transportation emissions from global fish distribution is also a concern, as the cost to mitigate these factors are high. Additionally, repurposing the agricultural land from beef production could disrupt local economies and necessitate retraining workers for new roles in fish farming.
          </Paragraph>
        </TextContent>
        <GalleryContent>
          <GalleryTitle>STATISTICS GALLERY</GalleryTitle>
          <GalleryArrow onClick={prevImage}>↑</GalleryArrow>
          <SmallImage src={images[(currentImageIndex - 1 + images.length) % images.length]} alt="Previous Statistic Image" />
          <GalleryImage src={images[currentImageIndex]} alt="Current Statistic Image" />
          <SmallImage src={images[(currentImageIndex + 1) % images.length]} alt="Next Statistic Image" />
          <GalleryArrow onClick={nextImage}>↓</GalleryArrow>
        </GalleryContent>
      </InfoSection>
    </PageContainer>
  );
};

export default InformationPage;
