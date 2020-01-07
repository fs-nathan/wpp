import React from 'react';

const OrderInit = () => {
  
  return (
    <div className = "oder-init-container">
      <div >
        <span className="title-oder-init">Hãy tạo đơn hàng và nâng cấp tài khoản PRO để sử dụng phần mềm trọn vẹn!</span>
      </div>
      <div className="step-content">
        <div className="step-oder-init">
          <span className="text-step">Bước 1: Thiếp lập đơn hàng</span>
        </div>
        <div className="step-oder-init">
          <span className="text-step">Bước 2: Tạo đơn đơn hàng</span>
        </div>
        <div className="step-oder-init">
          <span className="text-step">Bước 3: Thanh toán chuyển khoản</span>
        </div>
      </div>
      <div className="fotter-oder-init">
        <span>Mọi thắc mắc vui lòng liên hệ hotline <b>09.1800.6181</b> để được tư vấn và giải đáp</span>
      </div>
    </div>
  )
}

export default OrderInit;