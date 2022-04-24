import { Add, PlusOneOutlined } from "@material-ui/icons";
import { Box, IconButton, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

const InitialStep = ({ onNext }) => {
  const history = useHistory();

  function onClose() {
    history.goBack();
  }
  return (
    <Box className="initial-step">
      <div className="close-button">
        <IconButton fontSize="large" htmlColor="#969ead" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Typography variant="h4" style={{ margin: "0 0 10px" }}>
        Tạo một bảng việc mới
      </Typography>
      <Typography
        variant="subtitle1"
        color="#6d6e6f"
        style={{ margin: "0 0 96px", fontWeight: 300 }}
      >
        Bạn muốn bắt đầu như thế nào?
      </Typography>
      <div className="initial-step-options" onClick={onNext}>
        <div className="initial-step-item initial-step-create-new">
          <div className="initial-step-item-icon initial-step-create-new-icon">
            <Add fontSize="large" sx={{ color: "#333333" }} />
          </div>
          <Typography
            variant="subtitle1"
            style={{
              marign: 0,
              fontSize: "14px",
            }}
          >
            Bảng việc trống
          </Typography>
          <Typography variant="subtitle1" color="#6d6e6f">
            Bắt đầu từ đầu
          </Typography>
        </div>

        <div
          className="initial-step-item initial-step-template"
          onClick={() => history.push("/projects/template")}
        >
          <div className="initial-step-item-icon initial-step-template-icon">
            <img src="/images/rocket.png" alt="Rocket" />
          </div>
          <Typography
            variant="subtitle1"
            style={{
              marign: 0,
              fontSize: "14px",
            }}
          >
            Sử dụng một mẫu
          </Typography>
          <Typography variant="subtitle1" color="#6d6e6f">
            Chọn từ thư viện
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default InitialStep;
