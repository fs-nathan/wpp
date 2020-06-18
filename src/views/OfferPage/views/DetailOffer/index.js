import { Box, Container } from "@material-ui/core";
import Icon from "@mdi/react";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import styled from "styled-components";
import { labels } from "../../contants/attrs";
import Layout from "../../Layout";
import { OfferPageContext } from "../../OfferPageContext";
import { loadDetailOffer } from "../../redux/actions";
import { get } from "../../utils";
import DetailOffer from "./DetailOfferComponent";
import { getDetailOffer } from "./selector";
export const PageContainer = styled(Container)`
  overflow: auto;  
  padding: 16px;
  padding-right: 32px;
  min-height: 100%;
`;
const OfferByDepartment = (props) => {
    const dispatch = useDispatch();
    const { listMenu, setTitle } = useContext(OfferPageContext);
    const { id } = useParams()
    const isMounted = useMountedState();
    const detailOffer = useSelector(state => getDetailOffer(state));

    useEffect(() => {
        if (isMounted) {
            setTitle(get(labels, "pageTitleOfferDetailOffer"))
        }
    }, [isMounted, setTitle]);

    useEffect(() => {
        dispatch(loadDetailOffer({ id }));
    }, [id, dispatch]);

    return (
        <Layout
            title={
                <Box display="flex" alignItems="center">
                    <Icon
                        size={1.4}
                        {...{ color: listMenu[4].color, path: listMenu[4].icon }}
                    ></Icon>
                    <Box
                        {...{
                            paddingLeft: "20px",
                            fontSize: "21px",
                            lineHeight: "1",
                            fontWeight: "600",
                        }}
                    >
                        Chi tiết đề xuất
                    </Box>
                </Box>
            }
        >
            <PageContainer>
                <DetailOffer {...detailOffer} />
            </PageContainer>
        </Layout>
    );
};
export default React.memo(OfferByDepartment);
