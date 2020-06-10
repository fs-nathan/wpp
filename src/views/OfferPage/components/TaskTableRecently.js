import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { get, isEqual } from 'lodash';
import React, { useContext } from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { colors } from "../contants/attrs";
import { OfferPageContext } from '../OfferPageContext';
import EmptyHolder from "./EmptyHolder";
import InlineBadge from './InlineBadge';
import Popover from './Popover';
import "./TaskTableRecently.scss";
const styles = makeStyles((theme) => ({
  button_green: {
    backgroundColor: colors.offer_status_approved
  },
  button_red: {
    backgroundColor: colors.offer_of_me_monitoring
  },
  button_yellow: {
    backgroundColor: "#FFD700"
  },
  button_grey: {
    backgroundColor: "#e8e8e8"
  },
  button: {
    color: "white",
    height: "30px",
    width: "100px",
    border: 0
  },
  small_avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  tiny_avatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
  text_hightlight: {
    fontSize: "11px",
    fontWeight: 600,
  },
  blue_hightlight: {
    color: "#03a9f4",
    padding: "2px 3px",
    borderRadius: "2px",
    backgroundColor: "rgb(192,233,252)"
  },
  orange_hightlight: {
    color: "#ff9800",
    padding: "2px 3px",
    borderRadius: "2px",
    backgroundColor: "rgb(255,229,191)"
  },
  red_hightlight: {
    color: "#f44336",
    padding: "2px 3px",
    borderRadius: "2px",
    backgroundColor: "rgb(252,208,204)"
  },
  margin_hightlight: {
    marginLeft: "1px"
  }
}))
const WrapButton = styled.div`
  button:hover {
    outline:none;
    cursor:pointer;
  }
  button:focus {
    outline:none;
  }
  font-size : 12px;
`

export function TaskTableRecently({ offers }) {
  const classes = styles()
  const { t } = useTranslation()
  const {
    setDetailOfferModalOpen,
    setCurrentDetailOfferId,
  } = useContext(OfferPageContext);

  return (
    <>
      {offers.length === 0 || undefined ? < EmptyHolder /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="10%">
                  {t("VIEW_OFFER_LABEL_OFFER")}
                </TableCell>
                <TableCell width="15%" >
                  {t("VIEW_OFFER_LABEL_OFFER_DATE")}
                </TableCell>
                <TableCell width="30%" >
                  {t("VIEW_OFFER_LABEL_OFFER_CONTENT")}
                </TableCell>
                <TableCell width="15%" sortDirection="desc">
                  {t("VIEW_OFFER_LABEL_OFFER_MONITOR")}
                </TableCell>
                <TableCell width="15%" >
                  {t("VIEW_OFFER_LABEL_OFFER_APPROVAL")}
                </TableCell>
                <TableCell width="15%" >
                  {t("VIEW_OFFER_LABEL_OFFER_APPROVAL_DATE")}
                </TableCell>
                <TableCell  >
                  {t("VIEW_OFFER_LABEL_OFFER_APPROVAL_RESULT")}
                </TableCell>
                <TableCell width="5%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map((offer) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Avatar className={classes.small_avatar} src={get(offer, "user_create_avatar")} />
                  </TableCell>
                  <TableCell>
                    <div> {get(offer, "hour_label")}</div>
                    <div> {get(offer, "date_label")}</div>
                  </TableCell>
                  <TableCell>
                    <div className="offerTable-item-title-container">
                      <div
                        className="offerTable-item-title-link"
                        onClick={() => {
                          // For triggering offer detail data fetching from OfferPage component
                          setCurrentDetailOfferId(offer.id);
                          // Show offer detail modal
                          setDetailOfferModalOpen(true);
                        }}
                      >
                        {offer.title}
                      </div>
                      <div className="offerTable-item-title-chip-container">
                        {
                          !isEqual(get(offer, "type_name"), "") && (
                            <InlineBadge color={'#03a9f4'}>
                              {get(offer, "type_name")}
                            </InlineBadge>
                          )
                        }

                        {
                          get(offer, "priority_code") === 0 && (
                            <InlineBadge color={'#ff9800'}>
                              {get(offer, "priority_name")}
                            </InlineBadge>
                          )
                        }
                        {
                          get(offer, "priority_code") === 1 && (
                            <InlineBadge color={'#f44336'}>
                              {get(offer, "priority_name")}
                            </InlineBadge>
                          )
                        }
                        {
                          get(offer, "priority_code") === 2 && (
                            <InlineBadge color={'#f44336'}>
                              {get(offer, "priority_name")}
                            </InlineBadge>
                          )
                        }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Grid direction="row" container>
                      {get(offer, "member_monitor").map(member =>
                        <Avatar className={classes.tiny_avatar} src={get(member, "avatar")} />
                      )}
                    </Grid>
                  </TableCell>
                  <TableCell >
                    <Grid container >
                      {get(offer, "member_handled").map(member =>
                        <Avatar className={classes.tiny_avatar} src={get(member, "avatar")} />
                      )}
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <div> {get(offer, "hour_label_handle")}</div>
                    <div> {get(offer, "date_label_handle")}</div>
                  </TableCell>
                  <TableCell>
                    {get(offer, "status_code") === 0 &&
                      <>
                        <WrapButton>
                          <button
                            className={`${classes.button} ${classes.button_grey}`}
                            variant="contained"
                            size="small"
                            color="primary"
                          >
                            {get(offer, "status_name")} ({get(offer, "number_accepted")}/{get(offer, "number_have_to_handle")})
                          </button>
                        </WrapButton>
                      </>
                    }

                    {get(offer, "status_code") === 1 &&
                      <>
                        <WrapButton>
                          <button
                            className={`${classes.button} ${classes.button_yellow}`}
                            variant="contained"
                            size="small"
                            color="primary"
                          >
                            {get(offer, "status_name")} ({get(offer, "number_accepted")}/{get(offer, "number_have_to_handle")})
                          </button>
                        </WrapButton>
                      </>
                    }
                    {get(offer, "status_code") === 2 &&
                      <>
                        <WrapButton>
                          <button
                            className={`${classes.button} ${classes.button_green}`}
                            variant="contained"
                            size="small"
                            color="primary"
                          >
                            {get(offer, "status_name")} ({get(offer, "number_accepted")}/{get(offer, "number_have_to_handle")})
                          </button>
                        </WrapButton>
                      </>
                    }
                    {get(offer, "status_code") === 3 &&
                      <>
                        <WrapButton>
                          <button
                            className={`${classes.button} ${classes.button_red}`}
                            variant="contained"
                            size="small"
                            color="primary"
                          >
                            {get(offer, "status_name")} ({get(offer, "number_accepted")}/{get(offer, "number_have_to_handle")})
                          </button>
                        </WrapButton>
                      </>
                    }
                  </TableCell>
                  <TableCell>
                    <Popover offer_id={get(offer, "id")} url_redirect={offer.url_redirect} />
                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {}
    </>
  );
}
