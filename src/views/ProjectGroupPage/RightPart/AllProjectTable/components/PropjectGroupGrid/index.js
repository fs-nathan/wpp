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
import { Scrollbars } from "react-custom-scrollbars";

import ProjectGroupItem from "./ProjectGroupItem/ProjectGroupItem";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  CustomEventDispose,
  CustomEventListener,
  EDIT_PROJECT_GROUP,
  LIST_PROJECT_GROUP,
} from "constants/events";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const removed = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const DISABLED_GROUP_BACKGROUND_COLOR = "#e7e8e9";
export const DEFAULT_GROUP_BACKGROUND_COLOR = "#da4bbe";
/**
 * convert to 4-columns  grid
 * @param {normal array} inputArray
 */
const convertToGridLayout = (inputArray = []) => {
  inputArray.length > 0 && inputArray.push({ ...inputArray[0], idAdd: "add" });
  return inputArray.reduce((outputArr, current, index) => {
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

  React.useEffect(() => {
    const projLayout = convertToGridLayout(projectGroups);
    setGroupLayout(projLayout);
  }, [projectGroups]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(EDIT_PROJECT_GROUP.SUCCESS, doReloadList);
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

  const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
  };

  if (activeLoading) return <LoadingBox />;

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={500}
      autoHeight
      autoHeightMax={"100vh"}
    >
      <div className="projectGroupListGrid">
        {groupLayout.map((row, index) => {
          return (
            <div className="projectGroupListGrid__row" key={index}>
              <DragContainer
                groupName="1"
                orientation="horizontal"
                onDrop={(e) => {
                  const { removedIndex, addedIndex, payload } = e;
                  if (removedIndex === null && addedIndex === null) return;

                  const arrRow = [...groupLayout[index]];

                  const updatedRow = applyDrag(arrRow, e);

                  const updatedLayout = JSON.parse(JSON.stringify(groupLayout));
                  updatedLayout.splice(index, 1, updatedRow);

                  // reconstruct layout
                  const result = convertToGridLayout(
                    convertFromGridLayoutToArray(updatedLayout)
                  );

                  if (addedIndex !== null) {
                    if (!groupLayout[index][addedIndex].sort_index) return;
                    handleSortProjectGroup(
                      payload.id,
                      groupLayout[index][addedIndex].sort_index
                    );
                    setGroupLayout(result);
                  }
                }}
                getChildPayload={(i) => groupLayout[index][i]}
              >
                {row.map((projectGroup) => {
                  if (projectGroup.idAdd === "add") {
                    console.log("go here");
                    return (
                      <div className="smooth-dnd-draggable-wrapper">
                        <div
                          className="projectGroupListGrid__item projectGroupListGrid__item--add "
                          style={{
                            backgroundColor: DISABLED_GROUP_BACKGROUND_COLOR,
                          }}
                          onClick={onOpenCreateModal}
                        >
                          <AddOutlinedIcon />
                        </div>
                      </div>
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
