import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { Routes } from "views/OfferPage/contants/routes";
import { action, labels } from "../../contants/attrs";
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadOfferByGroupID, loadSummaryByGroup } from "../../redux/actions";
import { get } from "../../utils";
import Content from "./Content";
import FormDialog from "./modal";
import { getFirstSummaryGroup } from "./selector";
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
  const {
    keyword,
    listMenu,
    setOpenModalOfferByGroup,
    openModal,
    timeRange,
    statusFilter,
    setTitle
  } = useContext(OfferPageContext);
  const idFirstGroup = useSelector(state => getFirstSummaryGroup(state));
  const { id } = useParams();
  const isMounted = useMountedState();
  useEffect(() => {
    if (isMounted) {
      setTitle(get(labels, "pageTitleOfferByGroup"));
    }
  }, [
    dispatch,
    isMounted,
    timeRange.startDate,
    timeRange.endDate,
    statusFilter,
    context,
    setTitle,
    timeRange
  ]);
  useEffect(() => {
    dispatch(loadSummaryByGroup());
  }, [dispatch]);
  useEffect(() => {
    if (idFirstGroup === undefined || null) {
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
  const handleOpenModal = () => {
    setOpenModalOfferByGroup(false);
  };
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
              {t(listMenu[2].title)}
            </Box>
          </Box>
        }
      >
        <PageContainer>
          <Content />
        </PageContainer>
        <FormDialog type={action.CREATE_OFFER} open={openModal} handleOpenModal={handleOpenModal} />,
      </Layout>
    </>
  );
};
export default React.memo(OfferByGroup);
