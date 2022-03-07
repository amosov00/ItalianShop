import {
  LOAD_CATEGORY,
  LOAD_CATEGORY_SUCCESS,
  LOAD_PRODUCTS,
  SWITCH_CATEGORY_LOADING,
  SET_PRODUCTS_PAGE,
  SET_PRODUCTS_LOADING,
  LOAD_PRODUCTS_SUCCESS,
  SET_CATEGORY,
  SET_SUB_CATEGORY,
  SET_BRANDS_ID,
  SET_DISCOUNT_FILTER,
  RESET_CATEGORY, SET_MIN_PRICE, SET_MAX_PRICE, SET_STYLES_ID, SET_ORDER, LOAD_PRODUCT, SET_PRODUCT, SET_LIMIT, SET_TEXT
} from "./actions";

export function loadCategory() {
  return {
    type: LOAD_CATEGORY
  }
}

export function loadCategorySuccess(payload) {
  return {
    type: LOAD_CATEGORY_SUCCESS,
    payload
  }
}


export function switchCategoryLoading(payload) {
  return {
    type: SWITCH_CATEGORY_LOADING,
    payload
  }
}

export function loadProducts(page) {
  return {
    type: LOAD_PRODUCTS,
    page
  }
}

export function loadProductsSuccess(data, pageCount) {
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    payload: {
      data,
      pageCount
    }
  }
}

export function setBrandsId(payload) {
  return {
    type: SET_BRANDS_ID,
    payload
  }
}


export function setProductsPage(page) {
  return {
    type: SET_PRODUCTS_PAGE,
    page
  }
}


export function setProductsLoading(payload) {
  return {
    type: SET_PRODUCTS_LOADING,
    payload
  }
}

export function setCategory(payload) {
  return {
    type: SET_CATEGORY,
    payload
  }
}


export function setSubCategory(payload) {
  return {
    type: SET_SUB_CATEGORY,
    payload
  }
}

export function resetCategory() {
  return {
    type: RESET_CATEGORY,
  }
}

export function setPrice(payload, priceType) {
  if (priceType === 'min') {
    return {
      type: SET_MIN_PRICE,
      payload
    }
  }
  if (priceType === 'max') {
    return {
      type: SET_MAX_PRICE,
      payload
    }
  }
}

export function setStyleId(payload) {
  return {
    type: SET_STYLES_ID,
    payload
  }
}

export function setOrder(payload) {
  return {
    type: SET_ORDER,
    payload
  }
}

export function loadProduct(id) {
  return {
    type: LOAD_PRODUCT,
    id
  }
}

export function setProduct(payload) {
  return {
    type: SET_PRODUCT,
    payload
  }
}

export function setDiscountFilter(payload) {
  return {
    type: SET_DISCOUNT_FILTER,
    payload
  }
}

export function setLimit(payload) {
  return {
    type: SET_LIMIT,
    payload
  }
}

export function setText(payload) {
  return {
    type: SET_TEXT,
    payload
  }
}