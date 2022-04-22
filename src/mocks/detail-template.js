import { v4 as uuidv4 } from "uuid";

export const DETAIL_TEMPLATE = {
  id: uuidv4(),
  title: "Kế hoạch quản lý tài chính dự án",
  author: "Long Trần",
  description:
    "Xây dựng kế hoạch dự án tài chính minh bạch theo quy trình cụ thể. Quản lý tài chính dự án hiệu quả.",
  detail: `<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut faucibus
  felis. Proin vestibulum at sem eu gravida. Curabitur finibus, elit ut
  convallis efficitur, ex massa porttitor urna, nec molestie sapien ante eget
  risus. Vivamus molestie non dolor et finibus. Duis rutrum metus sit amet lacus
  porttitor congue. Curabitur sit amet diam congue, vehicula ex sit amet,
  rhoncus ex. Maecenas ac tincidunt arcu.
</p>
<p>
  Duis est ante, sodales eget sodales id, maximus nec est. Morbi fermentum
  ligula augue, quis elementum massa auctor vel. Integer ante mauris, auctor ac
  velit vitae, pretium pulvinar odio. Donec in nisl felis. Aenean posuere sapien
  sit amet ligula posuere, sed elementum justo maximus. Aenean accumsan dapibus
  quam sed tristique. Praesent ultricies, ligula vel hendrerit hendrerit, eros
  dui facilisis sem, vitae ornare neque justo ut mi. Ut sodales erat odio, sed
  imperdiet nibh pharetra ac. Duis ac turpis tristique, faucibus diam at,
  vestibulum nibh.
</p>
<p>
  Nunc ut orci velit. Fusce et mollis quam. Aenean bibendum nisi et elit
  tincidunt, vitae pellentesque turpis convallis. Suspendisse ut nisi quam.
  Nulla quis orci id dui ornare vehicula. Nam ac cursus ligula, et consequat
  arcu. Nullam vel sagittis nunc. In rhoncus, felis elementum fermentum
  condimentum, diam nulla accumsan nisi, nec consequat nisl massa nec enim.
  Aenean ultrices pellentesque viverra.
</p>
`,
  copied: "17,6 N",
  views: "107,5 N",
  thumbnail: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  parent: "Bussiness",
};
