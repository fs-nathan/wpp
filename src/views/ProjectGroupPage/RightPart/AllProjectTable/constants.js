import moment from 'moment';

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

export const times = [
  {
    title: 'Năm nay',
    description: `Năm ${moment().year()}`,
    option: () => [
      moment().startOf('year').toDate(), 
      moment().endOf('year').toDate(),
    ],
  }, {
    title: 'Tháng này',
    description: `Tháng ${moment().month() + 1}`,
    option: () => [
      moment().startOf('month').toDate(), 
      moment().endOf('month').toDate(),
    ]
  }, {
    title: 'Tháng trước',
    description: `Tháng ${moment().subtract(1, 'M').month() + 1}`,
    option: () => [
      moment().subtract(1, 'M').startOf('month').toDate(),
      moment().subtract(1, 'M').endOf('month').toDate(),
    ]
  }, {
    title: 'Tuần này',
    description: `Tuần ${moment().isoWeek()}`,
    option: () => [
      moment().startOf('isoWeek').toDate(),
      moment().endOf('isoWeek').toDate(),
    ]
  }, {
    title: 'Tuần trước',
    description: `Tuần ${moment().subtract(1, 'w').isoWeek()}`,
    option: () => [
      moment().subtract(1, 'w').startOf('isoWeek').toDate(),
      moment().subtract(1, 'w').endOf('isoWeek').toDate(),
    ]
  }, {
    title: 'Mọi lúc',
    description: `Toàn bộ thời gian`, 
    option: () => [
      undefined, 
      undefined,
    ]
  }, {
    title: 'Tùy chọn',
    description: 'Tùy chọn',
    option: () => [
      moment().toDate(),
      moment().toDate(),
    ]
  }
];