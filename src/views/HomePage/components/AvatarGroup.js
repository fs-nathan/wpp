import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import React from "react";
const useAvatarGroupStyles = makeStyles(() => ({
  item: ({ size, offset = -8 }) => ({
    width: size,
    height: size,
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: offset,
    }
  }),
}));

const AvatarGroup = ({ images, offset, size = 30, onClick }) => {
  const styles = useAvatarGroupStyles({ offset, size });
  return images.map((face, i) => (
    <Avatar className={styles.item + " avatar-member-like-love-in-post"} key={i} src={face} />
  ));
};
AvatarGroup.propTypes = {
  faces: PropTypes.arrayOf(PropTypes.string),
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
AvatarGroup.defaultProps = {
  offset: undefined, // spacing unit
  size: undefined, // spacing unit
};
export default AvatarGroup;
