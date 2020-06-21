import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import { CustomEventDispose, CustomEventListener } from "constants/events";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { loadTaskRencentlyPage } from "views/OfferPage/redux/actions";
import { DELETE_OFFER_SUCCESSFULLY, HANDLE_OFFER_OFFERPAGE, UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS } from "views/OfferPage/redux/types";
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { Content } from "./Content";

export const PageContainer = styled(Container)`
  overflow: auto;  
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
`;

const Recently = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listMenu, setTitle } = useContext(OfferPageContext);
  const isMounted = useMountedState();
  useEffect(() => {
    if (isMounted) {
      setTitle(t("VIEW_OFFER_LABEL_YOUR_OFFER"))
    }
  }, [isMounted, setTitle]);

  useEffect(() => {
    dispatch(loadTaskRencentlyPage());
    const refreshRencentlyPage = () => {
      dispatch(loadTaskRencentlyPage());
    }
    CustomEventListener(DELETE_OFFER_SUCCESSFULLY, refreshRencentlyPage);
    CustomEventListener(HANDLE_OFFER_OFFERPAGE, refreshRencentlyPage);
    CustomEventListener(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, refreshRencentlyPage);
    return () => {
      CustomEventDispose(DELETE_OFFER_SUCCESSFULLY, refreshRencentlyPage);
      CustomEventDispose(HANDLE_OFFER_OFFERPAGE, refreshRencentlyPage);
      CustomEventDispose(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, refreshRencentlyPage);
    }
  }, [dispatch]);

  return (
    <Layout
      title={
        <Box display="flex" alignItems="center">
          <Icon
            size={1.4}
            {...{ color: listMenu[1].color, path: listMenu[1].icon }}
          ></Icon>
          <Box
            {...{
              paddingLeft: "20px",
              fontSize: "21px",
              lineHeight: "1",
              fontWeight: "600",
            }}
          >
            {t(listMenu[1].title)}
          </Box>
        </Box>
      }
    >
      <PageContainer>
        <Content />
      </PageContainer>
    </Layout >
  );
};
export default Recently;
