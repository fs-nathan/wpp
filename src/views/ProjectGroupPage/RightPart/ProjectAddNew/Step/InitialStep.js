import { Add, PlusOneOutlined } from "@material-ui/icons";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const InitialStep = ({ onNext }) => {
  const { push } = useHistory();

  return (
    <Box className="initial-step">
      <Typography variant="h4" marginBottom={4}>
        Tạo một bảng việc mới
      </Typography>
      <Typography variant="subtitle1" color="#797979" marginBottom={12}>
        Bạn muốn bắt đầu như thế nào?
      </Typography>
      <div className="initial-step-options" onClick={onNext}>
        <div className="initial-step-item initial-step-create-new">
          <div className="initial-step-item-icon initial-step-create-new-icon">
            <Add fontSize="large" sx={{ color: "#333333" }} />
          </div>
          <Typography variant="subtitle1">Bảng việc trống</Typography>
          <Typography variant="subtitle1" color="#797979">
            Bắt đầu từ đầu
          </Typography>
        </div>

        <div
          className="initial-step-item initial-step-template"
          onClick={() => push("/projects/choose-theme")}
        >
          <div className="initial-step-item-icon initial-step-template-icon">
            <img src="/images/rocket.png" alt="Rocket" />
          </div>
          <Typography variant="subtitle1">Sử dụng một mẫu</Typography>
          <Typography variant="subtitle1" color="#797979">
            Chọn từ thư viện
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default InitialStep;
