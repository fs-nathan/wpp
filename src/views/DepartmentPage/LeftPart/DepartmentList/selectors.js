import { find, get } from 'lodash';
import { createSelector } from 'reselect';

const listRoom = state => state.room.listRoom;
const sortRoom = state => state.room.sortRoom;
const listUserOfGroup = state => state.user.listUserOfGroup;
const listIcon = state => state.icon.listIcon;
const createRoom = state => state.room.createRoom;

export const roomsSelector = createSelector(
  [listRoom, listUserOfGroup, listIcon, sortRoom, createRoom],
  (listRoom, listUserOfGroup, listIcon, sortRoom, createRoom) => {
    const { loading: sortRoomLoading, error: sortRoomError } = sortRoom;
    const { data: { rooms }, loading: listRoomLoading, error: listRoomError, firstTime: listFirst } = listRoom;
    const { data: { rooms: groups } } = listUserOfGroup;
    const { loading: createRoomLoading, error: createRoomError } = createRoom;
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
      loading: (listFirst ? false : listRoomLoading) || sortRoomLoading || createRoomLoading,
      error: listRoomError || sortRoomError || createRoomError,
      firstTime: listFirst,
    });
  }
);