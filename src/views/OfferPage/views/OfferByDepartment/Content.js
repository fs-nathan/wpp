import { Grid } from "@material-ui/core";
import { slice, take } from "lodash";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import BottomHeader from "views/OfferPage/components/BottomHeader";
import { TaskTableRecently } from "views/OfferPage/components/TaskTableRecently";
import { OfferPageContext } from "views/OfferPage/OfferPageContext";
import { getTaskByKeyword } from "./selector";



function Content() {
  const { statusFilter, keyword, scrollBarPosition } = useContext(OfferPageContext);
  const state = useSelector(state => state);
  const caculateStatus = useCallback(({ offers }) => {
    let waiting = 0; // Đợi duyệt code = 0
    let rejected = 0 // Từ chối code = 3
    let accepted = 0; // Chấp nhận code = 2
    let approving = 0 // Đang duyệt code = 1
    for (var i = 0; i < offers.length; i++) {
      switch (offers[i].status_code) {
        case 0:
          waiting++;
          break;
        case 1:
          approving++;
          break;
        case 2:
          accepted++;
          break;
        case 3:
          rejected++;
          break;
      }
    }

    let sum = offers.length;
    const waiting_rate = Math.round((waiting / (sum)) * 100);
    const accepted_rate = Math.round((accepted / (sum)) * 100);
    const rejected_rate = Math.round((rejected / (sum)) * 100);
    const approving_rate = 100 - (waiting_rate + accepted_rate + rejected_rate);
    return {
      waiting_rate: isNaN(waiting_rate) ? 0 : waiting_rate,
      accepted_rate: isNaN(accepted_rate) ? 0 : accepted_rate,
      rejected_rate: isNaN(rejected_rate) ? 0 : rejected_rate,
      approving_rate: isNaN(approving_rate) ? 0 : approving_rate
    };
  });
  const [currentPageData, setCurrentPageData] = useState([]);
  const [offersLength, setOffersLength] = useState(0);

  const renderTabList = useMemo(() => {
    const offers = getTaskByKeyword(keyword, statusFilter)(state);
    setOffersLength(offers.length);
    return offers;
  }, [keyword, state, statusFilter]);

  React.useEffect(() => {
    setCurrentPageData(take(renderTabList, 50));
  }, [renderTabList]);

  React.useEffect(() => {
    if (scrollBarPosition >= 0.995 && currentPageData.length != offersLength) {
      var numberPerPage = currentPageData.length;
      var newData = currentPageData.concat(slice(renderTabList, numberPerPage, numberPerPage + 50));
      setCurrentPageData(newData);
    }
  }, [scrollBarPosition]);

  return (
    <Grid container spacing={3}>
      {
        offersLength ? (
          <Grid item xs={12}>
            <BottomHeader
              count={offersLength}
              statistic_status={caculateStatus({ offers: renderTabList })}
            />
          </Grid>
        ) : null
      }
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item container xs={12}>
            <TaskTableRecently offers={currentPageData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Content;
