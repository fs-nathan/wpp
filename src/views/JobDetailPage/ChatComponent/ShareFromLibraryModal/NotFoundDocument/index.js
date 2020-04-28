import React from 'react';

function NotFoundDocument({ searchKey }) {
  return <div className="ShareFromLibraryModal--notFound">
    Không tìm thấy "<b>{searchKey}</b>" trong danh sách tài liệu của bạn
<div>
      Đề xuất:
</div>
    <ul>
      <li>
        Kiểm tra lại chính tả từ khoá đã nhập
  </li>
      <li>
        Hãy thử những từ khoá khác
  </li>
      <li>
        Hãy bớt từ khoá
  </li>
    </ul>
  </div>
}

export default NotFoundDocument