export const reorder = (list, startIndex, endIndex) => {
  const newList = Array.from(list);
  const [removed] = newList.splice(startIndex, 1);
  newList.splice(endIndex, 0, removed);
  return newList;
};  

export const moving = (source, destination, startIndex, endIndex) => {
  const newSource = Array.from(source);
  const newDestination = Array.from(destination);
  const [removed] = newSource.splice(startIndex, 1);
  newDestination.splice(endIndex, 0, removed);
  return [newSource, newDestination];
}