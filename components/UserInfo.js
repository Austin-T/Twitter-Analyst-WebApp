import React from 'react';
import PropTypes from 'prop-types';
import Octicon, { Briefcase, Calendar, Location } from '@primer/octicons-react';
import UserInfoStyles from './styles/UserInfoStyles';
import { Section } from '../style';

const UserInfo = ({ userData }) => (
  <Section dark>
    {userData && (
      <UserInfoStyles>
        {userData.avatarURL && (
          <div className="avatar">
            <img src={userData.avatarURL} alt="avatar" />
          </div>
        )}

        {userData.name && <h1>{userData.name}</h1>}

        {userData.screenName && (
          <h2>
            <a href={userData.url} target="_blank" rel="noopener noreferrer">
              @{userData.screenName}
            </a>
          </h2>
        )}

        <div className="info">
          {/* {userData.company && (
            <span className="info__item">
              <Octicon icon={Briefcase} size="small" />
              {userData.company}
            </span>
          )} */}

          {userData.location && (
            <span className="info__item">
              <Octicon icon={Location} size="small" />
              {userData.location}
            </span>
          )}

          {userData.createdAt && (
            <span className="info__item">
              <Octicon icon={Calendar} size="small" />
              Joined{' '}
              {new Date(userData.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>

        <div className="stats">
          <div className="stats__item">
            <span className="num">{userData.tweetsCount.toLocaleString()}</span>
            <span className="num-label">Tweets</span>
          </div>
          <div className="stats__item">
            <span className="num">{userData.followersCount.toLocaleString()}</span>
            <span className="num-label">Followers</span>
          </div>
          <div className="stats__item">
            <span className="num">{userData.followingCount.toLocaleString()}</span>
            <span className="num-label">Following</span>
          </div>
        </div>
      </UserInfoStyles>
    )}
  </Section>
);

UserInfo.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default UserInfo;
