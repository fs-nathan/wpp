import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { OfferPageContext } from "../../OfferPageContext";
import LeftSetting from "../LeftSetting";
import "./style.scss";
const ListPart = ({
                    searchPlaceHolder,
                    subMenu,
                    filter,
                    searchInput,
                    title,
                    listMenu,
                    setOpenModalOfferByGroup,
                    isOfferGroupManageable
                  }) => {
  const { t } = useTranslation();
  const { } = useContext(OfferPageContext)
  return (
    <LeftSetting
      filter={filter}
      searchPlaceHolder={searchPlaceHolder}
      subMenu={subMenu}
      searchInput={searchInput}
      setOpenModalOfferByGroup={setOpenModalOfferByGroup}
      title={title}
      listMenu={listMenu}
      isOfferGroupManageable={isOfferGroupManageable}
    />
  );
};

export default ListPart;
