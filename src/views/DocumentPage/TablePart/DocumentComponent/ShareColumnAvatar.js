import React from 'react';
// import { useTranslation } from 'react-i18next';
import '../DocumentPage.scss';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import { CustomAvatar } from './TableCommon';
import { Avatar } from '@material-ui/core';

const ShareColumnAvatar = props => {
  // const { t } = useTranslation();
  const handleClick = () => {
    if (props.handleClickAvatar) props.handleClickAvatar();
  };
  return (
    <div className="list-avatar-column">
      {!isEmpty(props.sharedList) &&
        props.sharedList.map((shareMember, idx) => {
          if (shareMember.avatar) {
            if (idx > 2) return null;
            else if (idx === 2 && props.sharedList.length > 3) {
              return (
                <Avatar
                  key={idx}
                  onClick={() => handleClick()}
                  className="more-avatar"
                >{`+${props.sharedList.length - 2}`}</Avatar>
              );
            } else {
              return (
                <CustomAvatar
                  src={shareMember.avatar}
                  key={idx}
                  icsmall="true"
                  title={shareMember.name}
                  onClick={() => handleClick()}
                />
              );
            }
          }
          return null;
        })}
    </div>
  );
};

export default ShareColumnAvatar;
