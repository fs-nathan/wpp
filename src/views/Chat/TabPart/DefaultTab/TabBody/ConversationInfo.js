import AvatarSquareGroup from 'components/AvatarSquareGroup';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import "./styles.scss"
import { currentColorSelector } from 'views/Chat/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { updateNameGroupChat } from "actions/chat/chat";
import { getTaskDetailTabPart } from 'actions/taskDetail/taskDetailActions';
import { CircularProgress } from '@material-ui/core';
import get from 'lodash/get';

const ConversationInfo = ({name, members, date_create, task_id, type_chat}) => {
	const appColor = useSelector(currentColorSelector)
	const [isEditName, setIsEditName] = React.useState(false);
	const [nameInput, setNameInput] = React.useState(name ? name : "");
	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch();
	const {
	    update_task
	  } = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails.permissions', {}));
	React.useEffect(() => {
	    if (name) {
	      setNameInput(name)
	    }
	}, [name]);

	const handleUpdateGroupName = async () => {
		setIsLoading(true)
	    try {
	    	await updateNameGroupChat({ task_id, name: nameInput });
	    	setIsEditName(false)
	    	dispatch(getTaskDetailTabPart({ taskId: task_id }));
	    	setIsLoading(false)
	    } catch (error) {
	    	setIsLoading(false)
	    }
	}

	return (
		<div className="conversation-information">
			<div className="ci-step-avatar">
				<AvatarSquareGroup images={members} classMore="ci-step-avatar-square" />
			</div>
			<div className="ci-step-name">
				{
					!isEditName ?
					<div>
						<span>{name}</span>
						{
							update_task && type_chat == 2 &&
							<EditIcon
								className="step-hover-edit"
								style={{background: appColor}}
								onClick={() => {
									setNameInput(name);
									setIsEditName(true);
								}}
							/>
						}
					</div> :
					<div className="el-edit-name-group-chat">
						<input type="text" value={nameInput} onChange={e => setNameInput(e.target.value)} />
						{
							isLoading ?
							<CircularProgress size={20} classes={{root: "icon-spin-update-name"}} /> :
							<React.Fragment>
								<CheckCircleIcon className="step-action step-save" onClick={() => handleUpdateGroupName()} />
								<CancelIcon className="step-action step-cancel" onClick={() => setIsEditName(false)} />
							</React.Fragment>
						}
					</div>
				}
			</div>
			<div className="ci-step-time">
				{date_create}
			</div>
		</div>
	)
}

export default ConversationInfo