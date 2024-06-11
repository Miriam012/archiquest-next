"use client";

import React from 'react';
import styled from 'styled-components';

// Import Archivo Black font from Google Fonts
const archivoBlackFontUrl = "https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap";

const PageContainer = styled.div`
  @import url('${archivoBlackFontUrl}');
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/path-to-your-ocean-background-image.jpg') no-repeat center center/cover;
  color: #333;
  font-family: 'Archivo Black', sans-serif;
  padding: 20px;
`;

const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 15px;
  color: #2a9d8f;
  text-align: center;
  font-weight: bold;
`;

const Header = styled.h2`
  font-size: 2em;
  margin-bottom: 15px;
  color: #2a9d8f;
  text-align: center;
  font-weight: bold;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  font-weight: normal;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const InformationPage = () => {
  return (
    <PageContainer>
      <ContentBox>
        <Title>This is an Introduction to the Issue of Beef Being Too Much Carbon Emissions</Title>
        <Header>Reimagining Protein Production for a Sustainable Future</Header>
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
      </ContentBox>
    </PageContainer>
  );
};

export default InformationPage;
