import { apiService } from "constants/axiosInstance";
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';
import { get } from 'lodash';
import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.scss";
class NavigatorMenu extends React.Component {
  state = {
    listGird: []
  }

  async componentDidMount() {
    try {
      const result = await apiService({
        url: "get-gird-list-task"
      })
      this.setState({
        listGird: result.data.girds
      })

    } catch (e) {
      SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(e, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
    }
  }
  render() {
    const match = this.state.listGird.filter(item => {
      return this.props.location.pathname.includes(item.url)
    })[0] || {}
    const listGirdRender = this.state.listGird.map(item => {
      console.log(item.url === match, item.url, "asdasdasdasd")
      return <p
        key={item.name}
        style={{
          background: item.url === match.url ? get(this.props.profileDetail, 'group_active.color', '#f2f2f2') : '#f2f2f2'
        }}
        className={item.url === match.url ? "gantt--left-header__text-active" : ""}
        id={`gantt-p-${item.name}`}
        onClick={() => {
          this.props.history.push(this.props.location.pathname.replace(match.url, item.url))
        }
        }
        onMouseOver={(e) => {
          document.getElementById(`gantt-p-${item.name}`).style.background = get(this.props.profileDetail, 'group_active.color', '#f2f2f2')
        }}
        onMouseLeave={() => {
          if (match && item.url === match.url) return
          document.getElementById(`gantt-p-${item.name}`).style.background = '#f2f2f2'
        }}
      >
        {item.name}
      </p>
    }
    )
    return <div className="gantt--navigation">
      {listGirdRender}
    </div>
  }
}

const mapStateToProps = (state) => ({
  profileDetail: state.system.profile,
});

export default withRouter(connect(mapStateToProps)(NavigatorMenu))