import { Avatar, ButtonBase, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import TasksCard from "../components/TasksCard";
import { routes } from "../contant/routes";
import { postModule } from "../redux/post";
import "./Statistic.css";
export const Statistic = ({
  data = [],
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <TasksCard.Container>
      {
        <TasksCard.Content>
          <div className="comp_Statistic__wrap">
            {data.map((item, i) => {
              return (
                <ButtonBase
                  title={item.name}
                  onClick={() => {
                    history.push(routes.category.path.replace(":id", item.id));
                  }}
                  key={i}
                  className="comp_Statistic__button"
                >
                  <div className="comp_Statistic__button__imageWrap">
                    <Avatar
                      className="comp_Statistic__button__image"
                      src={item.logo}
                    ></Avatar>
                  </div>
                  <div className="comp_Statistic__button__number">
                    {item.number_post}
                  </div>
                  <Typography className="comp_Statistic__button__label" noWrap>
                    {item.name}
                  </Typography>
                </ButtonBase>
              );
            })}
            {data.length === 0 && (
              <EmptyHolder title="Chưa có dữ liệu" description="" />
            )}
          </div>
        </TasksCard.Content>
      }
    </TasksCard.Container>
  );
};
export default (props) => {
  const dispatch = useDispatch();
  const data = useSelector(postModule.selectors.homeStatisticSelector);
  useEffect(() => {
    dispatch(postModule.actions.loadPostStatistic());
  }, [dispatch]);
  return <Statistic data={data} {...props} />;
};
