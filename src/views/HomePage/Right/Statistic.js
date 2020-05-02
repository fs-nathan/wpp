import { Avatar, Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import TasksCard from "../components/TasksCard";
import { routes } from "../contant/routes";
import { postModule } from "../redux/post";

export const Statistic = ({
  data = [
    // {
    //   id: "5e79c8959c136873cbfdb2f9",
    //   name: "Thông báo",
    //   logo:
    //     "https://storage.googleapis.com/storage_vtask_net/Icon_default/group.jpg",
    //   number_post: 0,
    // },
    // {
    //   id: "5e79c9009c136873cbfdbcec",
    //   name: "Sự kiện",
    //   logo:
    //     "https://storage.googleapis.com/storage_vtask_net/Icon_default/group.jpg",
    //   number_post: 8,
    // },
  ],
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <TasksCard.Container>
      {
        //    [
        //     {
        //         "id": "5e79c8959c136873cbfdb2f9",
        //         "name": "Thông báo",
        //         "logo": "https://storage.googleapis.com/storage_vtask_net/Icon_default/group.jpg",
        //         "number_post": 0
        //     },
        //     {
        //         "id": "5e79c9009c136873cbfdbcec",
        //         "name": "Sự kiện",
        //         "logo": "https://storage.googleapis.com/storage_vtask_net/Icon_default/group.jpg",
        //         "number_post": 8
        //     }
        // ]
        <TasksCard.Content>
          <Box display="flex">
            {data.map((item, i) => {
              return (
                <Box
                  onClick={() => {
                    history.push(routes.category.path.replace(":id", item.id));
                  }}
                  key={i}
                  width="25%"
                  padding="8px"
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                >
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "100%",
                      position: "relative",
                    }}
                  >
                    <Avatar
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      src={item.logo}
                    ></Avatar>
                  </div>
                  <Box
                    style={{
                      fontSize: "30px",
                      marginTop: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.number_post}
                  </Box>
                  <Typography nowrap>{item.name}</Typography>
                </Box>
              );
            })}
            {data.length === 0 && (
              <EmptyHolder title="Chưa có dữ liệu" description="" />
            )}
          </Box>
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
