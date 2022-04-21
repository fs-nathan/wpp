import LoadingBox from "components/LoadingBox";
import {
  Container as DragContainer,
  Draggable,
} from "components/react-smooth-dnd";
import { get } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import "./projectGroupGrid.scss";
import Scrollbars from "components/Scrollbars";

import ProjectGroupItem from "./ProjectGroupItem/ProjectGroupItem";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  CustomEventDispose,
  CustomEventListener,
  EDIT_PROJECT_GROUP,
  LIST_PROJECT_GROUP,
} from "constants/events";

export const DISABLED_GROUP_BACKGROUND_COLOR = "#e7e8e9";
export const DEFAULT_GROUP_BACKGROUND_COLOR = "#da4bbe";
/**
 * convert to 4-columns  grid
 * @param {normal array} inputArray
 */
const convertToGridLayout = (inputArray = []) => {
  if (inputArray.length === 0) return;
  const clonnedInputArray = JSON.parse(JSON.stringify(inputArray));
  clonnedInputArray.push({ ...clonnedInputArray[0], idAdd: "add" });

  const dummyPlaceHolderElementNumber = clonnedInputArray.length % 4;
  for (let index = 0; index < dummyPlaceHolderElementNumber; index++) {
    clonnedInputArray.push({
      ...clonnedInputArray[0],
      idPlaceHolder: "placeHolder",
    });
  }

  return clonnedInputArray.reduce((outputArr, current, index) => {
    const rowIndex = Math.floor(index / 4);
    let newArr = JSON.parse(JSON.stringify(outputArr));

    const rowArr = outputArr[rowIndex] ?? [];
    const updatedRowArr = [...rowArr, current];

    newArr.splice(rowIndex, 1, updatedRowArr);
    return newArr;
  }, []);
};

const convertFromGridLayoutToArray = (inputArray) => {
  return inputArray.flat();
};

const ProjectGroupGrid = ({
  projectGroups = [],
  onEdit,
  handleSortProjectGroup,
  setCurrentGroup,
  doReloadList,
  setActiveLoading,
  activeLoading,
  onOpenCreateModal,
}) => {
  const [groupLayout, setGroupLayout] = React.useState([]);
  const [projectGroupsInner, setProjectGroupInner] = React.useState([]);

  React.useEffect(() => {
    if (!groupLayout || groupLayout.length === 0) {
      const projLayout = convertToGridLayout(projectGroups);
      setGroupLayout(projLayout || []);
    }

    setProjectGroupInner(projectGroups);
  }, [projectGroups]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };

    const reloadList = () => {
      setActiveLoading(false);
      doReloadList();
      const projLayout = convertToGridLayout(projectGroupsInner);
      setGroupLayout(projLayout || []);
    };
    CustomEventListener(EDIT_PROJECT_GROUP.SUCCESS, reloadList);
    CustomEventListener(EDIT_PROJECT_GROUP.FAIL, fail);

    return () => {
      CustomEventDispose(EDIT_PROJECT_GROUP.SUCCESS, doReloadList);
      CustomEventDispose(EDIT_PROJECT_GROUP.FAIL, fail);
    };
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT_GROUP.SUCCESS, success);
    CustomEventListener(LIST_PROJECT_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT_GROUP.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT_GROUP.FAIL, fail);
    };
  }, []);

  const idGroupDefault = useSelector(
    ({ groupTask }) => groupTask.defaultGroupTask.data || ""
  );
  const idGroupDefaultLocal = localStorage.getItem(
    "WPS_WORKING_SPACE_DEFAULT_ACCESS"
  );

  if (activeLoading) return <LoadingBox />;

  return (
    <Scrollbars
      autoHide
      autoHeight
      autoHeightMax={"calc(100vh - 45px)"}
      autoHideTimeout={500}
      className="projectGroupListGrid__scroll"
    >
      <div className="projectGroupListGrid">
        {groupLayout.map((row, index) => {
          return (
            <div className="projectGroupListGrid__row" key={index}>
              <DragContainer
                groupName="1"
                orientation="horizontal"
                dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: "projectGroupListGrid___dropPlaceholder-preview",
                }}
                onDragStart={({ isSource, payload, willAcceptDrop }) => {
                  if (payload.idAdd || payload.idPlaceHolder) return;
                }}
                shouldAcceptDrop={(sourceContainerOptions, payload) => {
                  if (!!payload.idAdd || !!payload.idPlaceHolder) return false;
                  return true;
                }}
                onDrop={(e) => {
                  const { removedIndex, addedIndex, payload } = e;
                  if (removedIndex === null && addedIndex === null) return;
                  if (removedIndex === addedIndex) return;

                  if (addedIndex !== null) {
                    if (!groupLayout[index][addedIndex].sort_index) return;

                    debugger;

                    const projectGroupsCloned = JSON.parse(
                      JSON.stringify(projectGroups)
                    );

                    const sourceGroup = payload;

                    const destinationGroup = groupLayout[index][addedIndex];

                    if (
                      destinationGroup.idAdd ||
                      destinationGroup.idPlaceHolder
                    )
                      return;

                    const currentDestinationGroupIndex =
                      projectGroups.findIndex(
                        (ele) => ele.id === destinationGroup.id
                      );
                    const currentSourceGroupIndex = projectGroups.findIndex(
                      (ele) => ele.id === sourceGroup.id
                    );

                    projectGroupsCloned.splice(currentSourceGroupIndex, 1);

                    projectGroupsCloned.splice(
                      currentDestinationGroupIndex,
                      0,
                      payload
                    );

                    const result = convertToGridLayout(projectGroupsCloned);
                    setGroupLayout(result);
                    setTimeout(
                      () =>
                        handleSortProjectGroup(
                          payload.id,
                          destinationGroup.sort_index
                        ),
                      0
                    );
                  }
                }}
                getChildPayload={(i) => groupLayout[index][i]}
              >
                {row.map((projectGroup, index) => {
                  if (projectGroup.idAdd === "add") {
                    return (
                      <Draggable
                        key={`add-${index}`}
                        onClick={() => {
                          return;
                        }}
                      >
                        <div
                          className="projectGroupListGrid__item projectGroupListGrid__item--add "
                          style={{
                            backgroundColor: DISABLED_GROUP_BACKGROUND_COLOR,
                          }}
                          onClick={onOpenCreateModal}
                        >
                          <AddOutlinedIcon />
                        </div>
                      </Draggable>
                    );
                  }

                  if (projectGroup.idPlaceHolder === "placeHolder") {
                    return (
                      <Draggable
                        key={`placeholder-${index}`}
                        onClick={() => {
                          return;
                        }}
                      >
                        <div
                          className="projectGroupListGrid__item projectGroupListGrid__item--placeholder "
                          style={{
                            backgroundColor: DISABLED_GROUP_BACKGROUND_COLOR,
                          }}
                          onClick={() => {
                            return;
                          }}
                        >
                          <AddOutlinedIcon />
                        </div>
                      </Draggable>
                    );
                  }

                  const isDefaultGroup =
                    idGroupDefault === `?groupID=${projectGroup.id}` ||
                    `?groupID=${projectGroup.id}` === idGroupDefaultLocal;
                  const isDisplayUpdate = get(
                    projectGroup,
                    "can_modify",
                    false
                  );

                  const backgroundColor =
                    projectGroup.color || DEFAULT_GROUP_BACKGROUND_COLOR;
                  return (
                    <Draggable key={projectGroup.id}>
                      <ProjectGroupItem
                        backgroundColor={backgroundColor}
                        projectGroup={projectGroup}
                        handleClickEdit={(e) => {
                          onEdit(e.currentTarget, projectGroup);
                          setCurrentGroup(projectGroup);
                        }}
                        isDefaultGroup={isDefaultGroup}
                        isDisplayUpdate={isDisplayUpdate}
                      />
                    </Draggable>
                  );
                })}
              </DragContainer>
            </div>
          );
        })}
      </div>
    </Scrollbars>
  );
};
ProjectGroupGrid.propTypes = {
  projects: PropTypes.array,
};

export default ProjectGroupGrid;
