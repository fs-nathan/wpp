import WPSelectLabel from "components/SelectLabel";
import { apiService } from "constants/axiosInstance";
import React from "react";

const LabelList = () => {
  const [data, setData] = React.useState([]);
  const refOptions = React.useRef(null);

  React.useEffect(() => {
    const _getData = async () => {
      const result = await apiService({ url: "/project-label/list" });
      setData(result.data.labels);
    };

    _getData();
  }, []);

  return <WPSelectLabel ref={refOptions} isShowList defaultSelect={data} />;
};

export default LabelList;
