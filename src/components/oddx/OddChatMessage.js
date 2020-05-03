import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import utils from 'utils';
import IconAvatar from 'cdn/assets/icon-avatar.png';
import { StyledMessage, Avatar, Status, Name, Message, Time } from 'stylesheets/oddx/OddChatMessage.style.js';

const OddChatMessage = ({ user, message, time, online }) => {
  const { hours, mins } = utils.parseTime(time);
  const onlineStatus = classNames({ online });

  return (
    <StyledMessage>
      <Avatar src={IconAvatar} />
      <Status className={onlineStatus} />
      <Name>{user}</Name>
      <Message>{message}</Message>
      <Time>
        {hours}:{mins}
      </Time>
    </StyledMessage>
  );
};

OddChatMessage.propTypes = {
  user: PropTypes.string,
  message: PropTypes.string,
  time: PropTypes.number,
  online: PropTypes.bool,
};

export default OddChatMessage;