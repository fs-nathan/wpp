import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import { get } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { Routes } from "views/OfferPage/contants/routes";
import { action } from "../../contants/attrs";
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadOfferByGroupID, loadSummaryByGroup } from "../../redux/actions";
import Content from "./Content";
import FormDialog from "./modal";
import { getFirstSummaryGroup, getSummaryByGroupByKeyword } from "./selector";
export const PageContainer = styled(Container)`
  overflow: auto;
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
`;

const OfferByGroup = props => {

  const { t } = useTranslation();
  const context = useContext(OfferPageContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const [layoutTitle, setLayoutTitle] = useState("");

  const {
    listMenu,
    setOpenModalOfferByGroup,
    openModalOfferByGroup,
    timeRange,
    setTitle
  } = useContext(OfferPageContext);

  const idFirstGroup = useSelector(state => getFirstSummaryGroup(state));
  const groupList = useSelector(state => getSummaryByGroupByKeyword('', false, t)(state));
  const { id } = useParams();
  const isMounted = useMountedState();

  useEffect(() => {
    if (isMounted) {
      setTitle(t("VIEW_OFFER_LABEL_GROUP_SUBTITLE"))
    }
  }, [dispatch, isMounted, timeRange.startDate, timeRange.endDate, context, setTitle]);

  useEffect(() => {
    if (isMounted) {
      var currentGroup = groupList.filter(group => group.url === history.location.pathname);
      setLayoutTitle(get(currentGroup, '[0].title'));
    }
  }, [isMounted, history.location.pathname, idFirstGroup]);

  useEffect(() => {
    dispatch(loadSummaryByGroup());
  }, [dispatch]);

  useEffect(() => {
    if (history.location.pathname !== Routes.OFFERBYGROUP
      || idFirstGroup === undefined
      || idFirstGroup === null) {
      return
    }
    history.push(Routes.OFFERBYGROUP + "/" + idFirstGroup);
  }, [history, idFirstGroup]);

  useEffect(() => {
    const startDate = moment(timeRange.startDate).format("YYYY-MM-DD")
    const endDate = moment(timeRange.endDate).format("YYYY-MM-DD")
    dispatch(loadOfferByGroupID({ id, startDate, endDate }));
    document.getElementsByClassName("comp_LeftSideContainer___container ")[0].click()
  }, [dispatch, id, timeRange]);

  // Redirect to first group when enter
  return (
    <>
      <Layout
        title={
          <Box display="flex" alignItems="center">
            <Icon
              size={1.4}
              {...{ color: listMenu[2].color, path: listMenu[2].icon }}
            ></Icon>
            <Box
              {...{
                paddingLeft: "20px",
                fontSize: "21px",
                lineHeight: "1",
                fontWeight: "600"
              }}
            >
              {layoutTitle}
            </Box>
          </Box>
        }
      >
        <PageContainer>
          <Content />
        </PageContainer>
        <FormDialog
          type={action.CREATE_OFFER}
          open={openModalOfferByGroup}
          setOpen={setOpenModalOfferByGroup}
        />,
      </Layout>
    </>
  );
};

export default React.memo(OfferByGroup);
