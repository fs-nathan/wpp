import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import { merge, uniqueId } from "views/JobPage/utils";
const defaultasyncSelector = () => {
  return emptyObject;
};
const useAsyncTracker = (action) => {
  const dispatch = useDispatch();
  const [asyncId, setasyncId] = useState();
  const asyncSelector = asyncId
    ? (state) => state.apiCall[asyncId]
    : defaultasyncSelector;
  const [asyncAction, setAsyncAction] = useState();
  const { status, data } = useSelector(asyncSelector);
  useEffect(() => {
    if (asyncAction) {
      const asyncId = uniqueId("apiCall.");
      setasyncId(asyncId);
      dispatch(
        merge(asyncAction, {
          payload: {
            asyncId,
          },
        })
      );
    }
  }, [asyncAction, dispatch]);
  useEffect(() => {
    if (action) {
      setAsyncAction(action);
    }
  }, [action]);
  return useMemo(() => [{ status, asyncId, data }, setAsyncAction], [
    asyncId,
    data,
    status,
  ]);
};
export default useAsyncTracker;
