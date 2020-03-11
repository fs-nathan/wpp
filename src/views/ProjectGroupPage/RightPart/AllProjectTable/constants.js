export const filters = [
  {
    title: 'Tất cả',
    field: 'all',
    option: {},
  }, {
    title: 'Hoạt động',
    field: 'active',
    option: { visibility: true },
  }, {
    title: 'Ẩn',
    field: 'hidden',
    option: { visibility: false },
  }, {
    title: 'Đang chờ',
    field: 'waiting',
    option: { visibility: true, state_name: 'Waiting' },
  }, {
    title: 'Đang thực hiện',
    field: 'doing',
    option: { visibility: true, state_name: 'Doing' },
  }, {
    title: 'Hoàn thành',
    field: 'complete',
    option: { visibility: true, state_name: 'Finished' },
  }, {
    title: 'Quá hạn',
    field: 'expired',
    option: { visibility: true, state_name: 'Expired' },
  }, {
    title: 'Bạn tạo',
    field: 'created',
    option: {},
  }, {
    title: 'Bạn tham gia',
    field: 'assigned',
    option: {},
  }
];