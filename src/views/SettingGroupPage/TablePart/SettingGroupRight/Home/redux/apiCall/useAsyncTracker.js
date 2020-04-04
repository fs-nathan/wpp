import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import { merge, uniqueId } from "views/JobPage/utils";
const defaultasyncSelector = () => {
  return emptyObject;
};
const useAsyncTracker = () => {
  const dispatch = useDispatch();
  const [asyncId, setasyncId] = useState();
  const asyncSelector = asyncId
    ? state => state.apiCall[asyncId]
    : defaultasyncSelector;
  const [asyncAction, setAsyncAction] = useState();
  const { status } = useSelector(asyncSelector);
  useEffect(() => {
    if (asyncAction) {
      const asyncId = uniqueId("apiCall.");
      setasyncId(asyncId);
      dispatch(
        merge(asyncAction, {
          payload: {
            asyncId
          }
        })
      );
    }
  }, [asyncAction, dispatch]);
  return useMemo(() => [{ status }, setAsyncAction], [status]);
};
export default useAsyncTracker;
