import lRequest from "../../request/index"

export function getNavBarData() {
  return lRequest.get({
    url: "/navbar"
  })
}

