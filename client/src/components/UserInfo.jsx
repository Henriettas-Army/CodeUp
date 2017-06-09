import React from 'react';
import PropTypes from 'prop-types';
import Spinning from 'grommet/components/icons/Spinning';
import SendIcon from 'grommet/components/icons/base/Send';
import CodeIcon from 'grommet/components/icons/base/Code';
import EditIcon from 'grommet/components/icons/base/Edit';
import Status from 'grommet/components/icons/Status';
import Button from 'grommet/components/Button';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import Label from 'grommet/components/Label';
import Chip from 'react-toolbox/lib/chip';
import UserStatus from './UserStatus';
import TechEditForm from './TechEditForm';

const UserInfo = ({
  profile,
  status,
  updateProfile,
  currentUser,
  editing,
  errMessage,
  editProfile,
  addChatRoom,
  openEC,
  endorsedSkills }) => (
    <div>
      {status === 'LOADING' && <h3>Loading Profile... <Spinning size="large" /></h3>}
      {status === 'ERROR' && <h3>{errMessage}</h3>}
      {status === 'READY' &&
      <div className="user-container">
        <div className="bio-container">
          <div className="bio-child-image">
            <img className="profile" src={profile.img} alt="user github avatar" />
          </div>
          <div>
            <h2 className="header-margin">{profile.username}</h2>
            <h3 className="description header-margin">{profile.name}</h3>
            <span className="description">{profile.bio}</span><br />
            <span className="description">{profile.location ? profile.location.join(', ') : ''}</span>
          </div>
          <div>
            {profile.username === currentUser ?
              <UserStatus
                user={profile.username}
                updateProfile={updateProfile}
                status={profile.status}
              />
              : <span>
                {
                  profile.status === 'Unavailable' ?
                  (<h3 className="header-margin">
                    <Status value="critical" /><strong> Unavailable</strong>
                  </h3>)
                  : (<h3 className="header-margin"><strong>
                    {profile.status === 'Available' ? <Status value="ok" /> : <CodeIcon colorIndex={'accent-3'} className="codeNow" />}{`  ${profile.status}`}
                  </strong></h3>)
                }
                <Button
                  plain
                  label="Message"
                  size="small"
                  icon={<SendIcon />}
                  onClick={() => { addChatRoom(); }}
                />
                <br />
                <Button
                  size="small"
                  icon={<EditIcon />}
                  label="Endorse"
                  onClick={() => { openEC(); }}
                  plain
                />
              </span>
            }
          </div>
        </div>
        <div className="skills-container">
          <div>
            <div>
              <Label><strong>Technical Skills: </strong></Label><br />
              <div>
                {
                  profile.skills ?
                  profile.skills.map(s => (
                    <Chip style={{ display: 'inline-block', backgroundColor: '#2E8C65', color: '#fff' }} key={s}>{s}</Chip>
                  )) : 'N/A'
                }
              </div>
            </div>
            <div>
              <br />
              <br />
              <Label> <strong>Skills in Development: </strong></Label>
              <br />
              <div>
                {
                  profile.desired ?
                  profile.desired.map((s, k) => (
                    <Chip style={{ display: 'inline-block', backgroundColor: '#2E8C65', color: '#fff' }} key={+k + s}>{s}</Chip>
                  )) : 'N/A'
                }
              </div>
            </div>
            <div>
              <br />
              <br />
              <Label> <strong>Has been endorsed in: </strong></Label>
              <br />
              {
                endorsedSkills.filter((s, i) => (endorsedSkills.indexOf(s) === i)).map((s, k) => (
                  <Chip
                    style={{ display: 'inline-block', backgroundColor: '#2E8C65', color: '#fff' }}
                    key={s + +k}
                  >
                    <strong>{`${s} · ${endorsedSkills.filter(es => (es === s)).length}`}</strong>
                  </Chip>
                ))
              }
            </div>
          </div>
          <div className="edit-tech">
            { profile.username === currentUser ?
              <TechEditForm
                user={currentUser}
                updateProfile={updateProfile}
                skills={profile.skills}
                desired={profile.desired}
                location={profile.location}
                editProfile={editProfile}
                editing={editing}
              />
            : null}
          </div>
          <div>
            <span>
              <Label><strong>Top Languages</strong></Label>
              {profile.meter ?
                <AnnotatedMeter
                  type={'circle'}
                  units={'%'}
                  series={profile.meter}
                  legend
                />
                : ''
              }
            </span>
          </div>
        </div>
      </div>
    }
    </div>
);

UserInfo.propTypes = {
  currentUser: PropTypes.string,
  updateProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  endorsedSkills: PropTypes.arrayOf(PropTypes.string),
  errMessage: PropTypes.string,
  profile: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    bio: PropTypes.string,
    repos: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.arrayOf(PropTypes.string),
    desired: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
    meter: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
  addChatRoom: PropTypes.func.isRequired,
  openEC: PropTypes.func.isRequired,
};

UserInfo.defaultProps = {
  currentUser: '',
  endorsedSkills: [],
  errMessage: '',
};

export default UserInfo;
