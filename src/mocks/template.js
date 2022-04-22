import { v4 as uuidv4 } from "uuid";

export const TEMPLATE = [
  {
    id: uuidv4(),
    name: "Đã chia sẻ",
    templates: [],
  },
  {
    id: uuidv4(),
    name: "Được chia sẻ",
    templates: [],
  },
  {
    id: uuidv4(),
    name: "Công khai",
    templates: [
      {
        id: uuidv4(),
        name: "Business",
      },
      {
        id: uuidv4(),
        name: "Thiết kế",
      },
      {
        id: uuidv4(),
        name: "Giáo dục",
      },
      {
        id: uuidv4(),
        name: "Kỹ thuật",
      },
      {
        id: uuidv4(),
        name: "Marketing",
      },
      {
        id: uuidv4(),
        name: "Nhân sự & Điều hành",
      },
      {
        id: uuidv4(),
        name: "Cá nhân",
      },
      {
        id: uuidv4(),
        name: "Hiệu suất",
      },
    ],
  },
];
