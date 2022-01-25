import { ListItemIcon, ListItemText, OutlinedInput } from "@material-ui/core";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import TagIcon from "@mui/icons-material/Tag";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import styled from "styled-components";

export const OPTIONS_FIELDS_TYPE = [
  {
    icon: () => <ArrowCircleDownIcon />,
    text: "Danh sách chọn",
    type: "list",
  },
  {
    icon: () => <FormatColorTextIcon />,
    text: "Dữ liệu văn bản",
    type: "text",
  },
  {
    icon: () => <TagIcon />,
    text: "Con số",
    type: "number",
  },
];

export default function MultipleSelectPlaceholder({
  options = OPTIONS_FIELDS_TYPE,
  defaultValue = OPTIONS_FIELDS_TYPE[0].type,
  onSelect = () => {},
}) {
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = (event) => {
    setValue(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <WrapperSelect
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={value}
        onChange={handleChange}
        input={<OutlinedInput />}
        inputProps={{ "aria-label": "Without label" }}
      >
        {options.map((item, index) => (
          <WrapperMenu key={index} value={item.type} {...item}>
            {item.icon && (
              <ListItemIcon style={{ minWidth: 25 }}>
                <item.icon />
              </ListItemIcon>
            )}
            <ListItemText>{item.text}</ListItemText>
          </WrapperMenu>
        ))}
      </WrapperSelect>
    </FormControl>
  );
}

const WrapperSelect = styled(Select)`
  .MuiOutlinedInput-input {
    display: flex;
    align-items: center;
    padding: 12.5px 14px;
    color: #666;
    .MuiTypography-root {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 15px);
    }
  }
`;

const WrapperMenu = styled(MenuItem)`
  padding: 12.5px 14px !important;
`;
