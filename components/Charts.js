import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { buildChart, langColors, backgroundColor, borderColor } from '../utils';
import ChartsStyles from './styles/ChartsStyles';
import { Section } from '../style';

const Charts = ({ langData, repoData }) => {
  // Create chart with langData
  const [langChartData, setLangChartData] = useState(null);
  const initLangChart = () => {
    const ctx = document.getElementById('langChart');
    const labels = langData.map(lang => lang.label);
    const data = langData.map(lang => lang.value);

    setLangChartData(data);

    if (data.length > 0) {
      const backgroundColor = langData.map(
        ({ color }) => `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}B3`,
      );
      const borderColor = langData.map(lang => `${lang.color}`);
      const chartType = 'pie';
      const axes = false;
      const legend = true;
      const config = { ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend };
      buildChart(config);
    }
  };

  // Create Most Starred Hashtags chart
  const [starChartData, setStarChartData] = useState(null);
  const initStarChart = () => {
    const ctx = document.getElementById('starChart');
    const LIMIT = 5;
    const sortProperty = 'likes';
    const mostStarredRepos = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);
    const labels = mostStarredRepos.map(repo => repo.hashtag);
    const data = mostStarredRepos.map(repo => repo[sortProperty]);

    setStarChartData(data);

    if (data.length > 0) {
      const chartType = 'bar';
      const axes = true;
      const legend = false;
      const config = { ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend };
      buildChart(config);
    }
  };

  // Create Stars per language chart
  const [thirdChartData, setThirdChartData] = useState(null);
  const initThirdChart = () => {
    const ctx = document.getElementById('thirdChart');
    const filteredRepos = repoData.filter(repo => !repo.fork && repo.likes > 0);
    const uniqueLangs = new Set(filteredRepos.map(repo => repo.date));
    const labels = Array.from(uniqueLangs.values()).filter(l => l);
    const data = labels.map(lang => {
      const repos = filteredRepos.filter(repo => repo.date === lang);
      const starsArr = repos.map(r => r.likes);
      const starSum = starsArr.reduce((a, b) => a + b, 0);
      return starSum;
    });

    setThirdChartData(data);

    if (data.length > 0) {
      const chartType = 'line';
      const axes = true;
      const legend = false;
      const borderColor = labels.map(label => langColors[label[1].toUpperCase()]);
      const backgroundColor = borderColor.map(color => `${color}B3`);
      const config = { ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend };
      buildChart(config);
    }
  };

  useEffect(() => {
    if (langData.length && repoData.length) {
      initLangChart();
      initStarChart();
      initThirdChart();
    }
  }, []);

  const chartSize = 300;
  const langChartError = !(langChartData && langChartData.length > 0);
  const starChartError = !(starChartData && starChartData.length > 0);
  const thirdChartError = !(thirdChartData && thirdChartData.length > 0);

  return (
    <Section>
      <ChartsStyles>
        <div className="chart">
          <header>
            <h2>Audience Sentiment</h2>
          </header>

          <div className="chart-container">
            {langChartError && <p>Nothing to see here!</p>}
            <canvas id="langChart" width={chartSize} height={chartSize} />
          </div>
        </div>

        <div className="chart">
          <header>
            <h2>Daily Enagagement</h2>
          </header>
          <div className="chart-container">
            {thirdChartError && <p>Nothing to see here!</p>}
            <canvas id="thirdChart" width={chartSize} height={chartSize} />
          </div>
        </div>

        <div className="chart">
          <header>
            <h2>Likes per Hashtag</h2>
          </header>
          <div className="chart-container">
            {starChartError && <p>Nothing to see here!</p>}
            <canvas id="starChart" width={chartSize} height={chartSize} />
          </div>
        </div>

      </ChartsStyles>
    </Section>
  );
};

Charts.propTypes = {
  langData: PropTypes.array.isRequired,
  repoData: PropTypes.array.isRequired,
};

export default Charts;
