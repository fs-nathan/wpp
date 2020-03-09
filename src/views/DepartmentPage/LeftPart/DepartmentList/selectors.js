import { createSelector } from 'reselect';
import { get, find } from 'lodash';

const listRoom = state => state.room.listRoom;
const sortRoom = state => state.room.sortRoom;
const listUserOfGroup = state => state.user.listUserOfGroup;
const listIcon = state => state.icon.listIcon;

export const roomsSelector = createSelector(
  [listRoom, listUserOfGroup, listIcon, sortRoom],
  (listRoom, listUserOfGroup, listIcon, sortRoom) => {
    const { loading: sortRoomLoading, error: sortRoomError } = sortRoom;
    const { data: { rooms }, loading: listRoomLoading, error: listRoomError } = listRoom;
    const { data: { rooms: groups } } = listUserOfGroup;
    const newGroups = groups.map(group => ({
      ...group,
      id: get(group, 'id').toLowerCase(),
    }))
    const { data: { icons, defaults } } = listIcon;
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
      loading: listRoomLoading || sortRoomLoading,
      error: listRoomError || sortRoomError,
    });
  }
);