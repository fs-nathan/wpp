import { IconButton } from '@material-ui/core';
import { mdiCommentQuote, mdiDotsVertical, mdiForward, mdiGoodreads } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import './styles.scss';


const CommonMessageAction = (props) => {

  return (
    <div className="CommonMessageAction"  >
      <IconButton className="CommonMessageAction--IconButton"  >
        <Icon className="CommonMessageAction--Icon" path={mdiForward} />
      </IconButton>
      <IconButton className="CommonMessageAction--IconButton"  >
        <Icon className="CommonMessageAction--Icon" path={mdiCommentQuote} />
      </IconButton>
      <IconButton className="CommonMessageAction--IconButton"  >
        <Icon className="CommonMessageAction--Icon" path={mdiGoodreads} />
      </IconButton>
      <IconButton className="CommonMessageAction--IconButton"  >
        <Icon className="CommonMessageAction--Icon" path={mdiDotsVertical} />
      </IconButton>
    </div>
  );
}

CommonMessageAction.propTypes = {

};

export default CommonMessageAction;
