import {SWITCH_BRANDS_LOADING, LOAD_BRANDS, LOAD_BRANDS_SUCCESS, CLEAR_BRANDS_STATE, LOAD_BRAND, LOAD_BRAND_SUCCESS, SET_BRANDS_PAGE} from "./actions";


export function switchBrandsLoading(payload) {
  return {
    type: SWITCH_BRANDS_LOADING,
    payload
  }
}

export function loadBrands(page) {
  return {
    type: LOAD_BRANDS,
    page
  }
}


export function loadBrand(id) {
  return {
    type: LOAD_BRAND,
    id
  }
}


export function loadBrandsSuccess(payload) {
  return {
    type: LOAD_BRANDS_SUCCESS,
    payload
  }
}

export function loadBrandSuccess(payload) {
  return {
    type: LOAD_BRAND_SUCCESS,
    payload
  }
}

export function clearBrandsState() {
  return {
    type: CLEAR_BRANDS_STATE
  }
}

export function setBrandsPage(page) {
  return {
    type: SET_BRANDS_PAGE,
    page
  }
}
