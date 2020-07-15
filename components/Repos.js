import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Octicon, { Repo, Star, RepoForked, TriangleDown, Heart, Mention, Sync } from '@primer/octicons-react';
import FlipMove from 'react-flip-move';
import { feedbackColors } from '../utils';
import ReposStyles from './styles/ReposStyles';
import DropdownStyles from './styles/DropdownStyles';
import { Section } from '../style';



const Repos = ({ repoData }) => {
  const [topRepos, setTopRepos] = useState([]);
  const [sortType, setSortType] = useState('likes');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getTopRepos = type => {
    const LIMIT = 8;
    const map = {
      likes: 'likes',
      retweets: 'retweets',
      feedback: 'feedback',
    };
    const sortProperty = map[type];
    const sorted = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);

    setTopRepos(sorted);
  };

  useEffect(() => {
    if (repoData.length) {
      getTopRepos();
    }
  }, []);

  useEffect(() => getTopRepos(sortType), [sortType]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const changeRepoSort = sortType => {
    setSortType(sortType);
    toggleDropdown();
  };

  const sortTypes = ['likes', 'retweets', 'feedback'];

  return (
    <Section>
      <ReposStyles>
        <header>
          <h2>Top Tweets</h2>
          <div className="dropdown-wrapper">
            <span className="label">sorted by</span>
            <DropdownStyles active={dropdownOpen}>
              <button className="dropdown__button" onClick={() => toggleDropdown()}>
                <label>{sortType}</label>
                <Octicon icon={TriangleDown} />
              </button>
              <ul className="dropdown__list">
                {sortTypes.map((type, i) => (
                  <li className="dropdown__list-item" key={i}>
                    <button onClick={() => changeRepoSort(type)}>{type}</button>
                  </li>
                ))}
              </ul>
            </DropdownStyles>
          </div>
        </header>

        <div className="repo-list">
          {topRepos.length > 0 ? (
            <FlipMove typeName="ul">
              {
                topRepos.map(repo => (
                <li key={repo.id}>
                  {/* <blockquote class="twitter-tweet">
                    <p lang="en" dir="ltr">{repo.body}</p>
                    <p>Date: {repo.date}</p>
                    <p>Likes: {repo.likes}</p>
                    <p>Retweets: {repo.retweets}</p>
                    <p>Hashtags: {repo.hashtags}</p>
                  </blockquote> */}
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo">
                    <div className="repo__top">
                      <div className="repo__name">
                        <Octicon icon={Repo} />
                        <h3>{repo.date}</h3>
                      </div>
                      <p>{repo.body}</p>
                    </div>
                    <div className="repo__stats">
                      <div className="repo__stats--left">
                      <span>
                        <div
                          className="language"
                          style={{ backgroundColor: feedbackColors[repo.feedback] }}
                        />
                        {repo.feedback}{repo.feedbackStr}
                      </span>
                        <span>
                          <Octicon icon={Heart} />
                          {repo.likes}
                        </span>
                        <span>
                          <Octicon icon={Sync} />
                          {repo.retweets}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </FlipMove>
          ) : (
            <p>No available tweets!</p>
          )}
        </div>
      </ReposStyles>
    </Section>
  );
};

Repos.propTypes = {
  repoData: PropTypes.array.isRequired,
};

export default Repos;
