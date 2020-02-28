export const filters = [
  {
    title: 'Tất cả',
    option: {},
  }, {
    title: 'Hoạt động',
    option: { visibility: true },
  }, {
    title: 'Ẩn',
    option: { visibility: false },
  }, {
    title: 'Đang chờ',
    option: { visibility: true, state_name: 'Waiting' },
  }, {
    title: 'Đang thực hiện',
    option: { visibility: true, state_name: 'Doing' },
  }, {
    title: 'Hoàn thành',
    option: { visibility: true, state_name: 'Finished' },
  }, {
    title: 'Quá hạn',
    option: { visibility: true, state_name: 'Expired' },
  }, {
    title: 'Bạn tạo',
    option: {},
  }, {
    title: 'Bạn tham gia',
    option: {},
  }
];