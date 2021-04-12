export const priorityList = [
  { id: 0, value: 'Bình thường' },
  { id: 1, value: 'Gấp' },
  { id: 2, value: 'Rất gấp' }
];

export function getStatusName(total_rejected, total_approved) {
  if (total_rejected > 0) return 'Từ chối';
  if (total_approved > 0) return 'Đồng ý';
  return 'Chờ duyệt';
}

export function getStatus(total_rejected, total_approved) {
  if (total_rejected > 0) return 'rejected';
  if (total_approved > 0) return 'approve';
  return 'normal';
}