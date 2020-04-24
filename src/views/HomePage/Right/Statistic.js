import { Avatar, Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import TasksCard from "../components/TasksCard";
import { postModule } from "../redux/post";

export const Statistic = ({
  data = [
    {
      id: "5e79c8959c136873cbfdb2f9",
      name: "Thông báo",
      logo:
        "https://storage.googleapis.com/storage_vtask_net/Icon_default/group.jpg",
      number_post: 0,
    },
    {
      id: "5e79c9009c136873cbfdbcec",
      name: "Sự kiện",
      logo:
        "https://storage.googleapis.com/storage_vtask_net/Icon_default/group.jpg",
      number_post: 8,
    },
  ],
}) => {
  const { t } = useTranslation();
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
        <Box display="flex">
          {data.map((item, i) => {
            return (
              <Box
                key={i}
                flex={1}
                minWidth="90px"
                padding="20px"
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <Avatar
                  style={{ width: "70px", height: "70px" }}
                  src={item.logo}
                ></Avatar>
                <Box
                  style={{
                    fontSize: "30px",
                    marginTop: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {item.number_post}
                </Box>
                <Box>{item.name}</Box>
              </Box>
            );
          })}
          {data.length === 0 && (
            <EmptyHolder title="Chưa có dữ liệu" description="" />
          )}
        </Box>
      }
    </TasksCard.Container>
  );
};
export default (props) => {
  const dispatch = useDispatch();
  const data = useSelector(postModule.selectors.homeStatisticSelector);
  useEffect(() => {
    dispatch(postModule.actions.loadPostStatistic());
  }, []);
  return <Statistic data={data} {...props} />;
};
