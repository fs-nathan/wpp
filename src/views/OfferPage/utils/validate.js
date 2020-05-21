

export const checkUserIsInOfferGroupRoutes = (pathname) => {
  const regex = new RegExp("(?=offers\/groups).*[a-z0-9A-Z]")
  return regex.test(pathname)
}
export const checkUserIsInOfferDepartmentRoutes = (pathname) => {
  const regex = new RegExp("(?=offers\/divisions).*[a-z0-9A-Z]")
  return regex.test(pathname)
}
export const checkUserIsInOfferProjectRoutes = (pathname) => {
  const regex = new RegExp("(?=offers\/projects).*[a-z0-9A-Z]")
  return regex.test(pathname)
}