import { Grid } from "@material-ui/core";
import React, { useCallback, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import BottomHeader from "views/OfferPage/components/BottomHeader";
import { TaskTableRecently } from "views/OfferPage/components/TaskTableRecently";
import { OfferPageContext } from "views/OfferPage/OfferPageContext";
import { TASK_RECENTLY } from 'views/OfferPage/redux/types';
import { getTaskByKeyword } from "./selector";

export function Content() {
  const state = useSelector(state => state);
  const caculateStatus = useCallback(({ offers }) => {
    let waiting = 0; // Đợi duyệt code = 0
    let rejected = 0 // Từ chối code = 3
    let accepted = 0; // Chấp nhận code = 2
    let approving = 0 // Đang duyệt code = 1

    offers.forEach(x => {
      if (x.status_code === 0) waiting++;
      if (x.status_code === 1) approving++
      if (x.status_code === 2) accepted++;
      if (x.statuc_code === 3) rejected++;
    });
    let sum = waiting + accepted + approving + rejected
    const waiting_rate = Math.ceil((waiting / (sum)) * 100);
    const accepted_rate = Math.ceil((accepted / (sum)) * 100);
    const rejected_rate = Math.ceil((rejected / (sum)) * 100);
    const approving_rate = Math.ceil((approving / (sum)) * 100);
    return {
      waiting_rate: isNaN(waiting_rate) ? 0 : waiting_rate,
      accepted_rate: isNaN(accepted_rate) ? 0 : accepted_rate,
      rejected_rate: isNaN(rejected_rate) ? 0 : rejected_rate,
      approving_rate: isNaN(approving_rate) ? 0 : approving_rate
    };
  });
  const { statusFilter, keyword } = useContext(OfferPageContext);

  const renderTabList = useMemo(() => {
    return getTaskByKeyword(keyword, statusFilter)(state);
  }, [keyword, state, statusFilter]);
  const renderLength = useMemo(() => {
    const offers = getTaskByKeyword(keyword, statusFilter)(state);
    return offers.length;
  }, [keyword, state, statusFilter]);

  const loading = useMemo(() => {
    const taskRecently = state.offerPage[TASK_RECENTLY];
    return taskRecently.loading;
  }, [state]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BottomHeader
          count={renderLength}
          statistic_status={caculateStatus({ offers: renderTabList })}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item container xs={12}>
            <TaskTableRecently offers={renderTabList} loading={loading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
