import { createSelector } from 'reselect';
import { get, find } from 'lodash';

const listRoom = state => state.room.listRoom;
const listUserOfGroup = state => state.user.listUserOfGroup;
const listIcon = state => state.icon.listIcon;

export const roomsSelector = createSelector(
  [listRoom, listUserOfGroup, listIcon],
  (listRoom, listUserOfGroup, listIcon) => {
    const { data: { rooms }, loading: listRoomLoading, error: listRoomError } = listRoom;
    const { data: { rooms: groups }, error: listUserOfGroupError, loading: listUserOfGroupLoading } = listUserOfGroup;
    const newGroups = groups.map(group => ({
      ...group,
      id: get(group, 'id').toLowerCase(),
    }))
    const { data: { icons, defaults }, loading: iconLoading, error: iconError } = listIcon;
    const allIcons = [...icons.map(icon => get(icon, 'url_full')), ...defaults.map(icon => get(icon, 'url_icon'))];
    const newRooms = rooms.map(curRoom => {
      const curGroup = find(newGroups, { 'id': get(curRoom, 'id').toLowerCase() });
      const result = {
        ...curRoom,
        number_member: get(curGroup, 'users', []).length,
        icon: allIcons.includes(get(curRoom, 'icon', '___no-icon___')) 
          ? get(curRoom, 'icon') 
          : get(defaults[0], 'url_icon'),
      }
      return result;
    });
    return ({
      rooms: newRooms,
      loading: listRoomLoading || listUserOfGroupLoading || iconLoading,
      error: listRoomError || listUserOfGroupError || iconError,
    });
  }
);