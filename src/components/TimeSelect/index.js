import React from 'react';

import CustomSelect from 'components/CustomSelect';

let listTimeSelect = [];
for (let index = 0; index < 24; index++) {
  listTimeSelect.push(`${index}:00`, `${index}:30`)
}
listTimeSelect = listTimeSelect.map(value => ({ value, label: value }))

function TimeSelect({ className, value, onChange }) {
  return (
    <CustomSelect
      className={className}
      value={value}
      onChange={onChange}
      options={listTimeSelect}
    />
  )
}

export default TimeSelect
export { listTimeSelect }