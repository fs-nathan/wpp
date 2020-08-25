import { isFunction } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bgColorSelector } from './selectors';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div
    className={`comp_NoData___container ${className}`}
    {...props}
  />

function NoData({
  title = 'Không có dữ liệu',
  subtitle = 'Chưa có dữ liệu, hãy tạo mới dữ liệu để bắt đầu',
  bgColor,
}) {
  return (
    <Container>
      <img src='/images/no-data.png' alt='no-data-logo' />
      {isFunction(title) ? title() : (
        <p
          style={{
            color: bgColor.color,
          }}
        >{title}</p>
      )}
      {isFunction(subtitle) ? subtitle() : (
        <p>{subtitle}</p>
      )}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
  }
}

export default connect(
  mapStateToProps,
  null,
)(NoData);
