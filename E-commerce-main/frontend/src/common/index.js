const backendDomin = "http://localhost:8001";

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
  updateProfile: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  createOrder: {
    url: `${backendDomin}/api/orders`,
    method: "post",
  },
  getUserOrders: {
    url: `${backendDomin}/api/get-user-orders`,
    method: "post",
  },
  getAllOrders: {
    url: `${backendDomin}/api/get-orders`,
    method: "get",
  },
  updateStatus: {
    url: `${backendDomin}/api/update-status`,
    method: "post",
  },
  requestPasswordReset:{
    url: `${backendDomin}/api/request-password-reset`,
    method: "post",
  },
  verifyResetPassword:{
    url: `${backendDomin}/api/verify-reset-code`,
    method: "post",
  },
  PasswordReset:{
    url: `${backendDomin}/api/reset-password`,
    method: "post",
  },
};

export default SummaryApi;
