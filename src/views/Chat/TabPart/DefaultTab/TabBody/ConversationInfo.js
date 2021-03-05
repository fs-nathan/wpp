import AvatarSquareGroup from 'components/AvatarSquareGroup';
import React from 'react';
import "./styles.scss"

const ConversationInfo = ({name, members, date_create}) => {
	return (
		<div className="conversation-information">
			<div className="ci-step-avatar">
				<AvatarSquareGroup images={members} classMore="ci-step-avatar-square" />
			</div>
			<div className="ci-step-name">
				{name}
			</div>
			<div className="ci-step-time">
				{date_create}
			</div>
		</div>
	)
}

export default ConversationInfo