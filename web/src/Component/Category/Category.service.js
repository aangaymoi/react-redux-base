// just a stub

export const data = [
  {
    id: 0,
    name: "Popular",
    href: "/all-stores",
    iconUrl:
      "https://cloud.shopback.com/raw/upload/static/images/icon/core/fire.svg"
  },
  {
    id: 2,
    name: "Dining",
    shortname: "dining",
    priority: 1,
    href: "/all-stores/dining",
    iconUrl:
      "https://cloud.shopback.com/raw/upload/static/images/icon/core/burger.svg"
  },
  {
    id: 12,
    name: "Travel",
    shortname: "travel",
    priority: 2,
    href: "/all-stores/travel",
    iconUrl:
      "https://cloud.shopback.com/raw/upload/static/images/icon/core/plane.svg"
  },
  {
    id: 3,
    name: "Electronics",
    shortname: "electronics",
    priority: 3,
    href: "/all-stores/electronics",
    iconUrl:
      "https://cloud.shopback.com/raw/upload/static/images/icon/core/laptop.svg"
  },
  {
    id: 4,
    name: "Fashion",
    shortname: "fashion",
    priority: 4,
    href: "/all-stores/fashion",
    iconUrl:
      "https://cloud.shopback.com/raw/upload/static/images/icon/core/tshirt.svg"
  },
  {
    id: 6,
    name: "Groceries",
    shortname: "groceries",
    priority: 6,
    href: "/all-stores/groceries",
    iconUrl:
      "https://cloud.shopback.com/raw/upload/static/images/icon/core/lettuce.svg"
  },
  {
    id: 7,
    name: "Health & Beauty",
    shortname: "health-beauty",
    priority: 7,
    href: "/all-stores/health-beauty",
    iconUrl:
      "https://cloud.shopback.com/raw/upload/static/images/icon/core/lipstick.svg"
  },
  {
    id: 8,
    name: "Home & Living",
    shortname: "home-living",
    priority: 8,
    href: "/all-stores/home-living",
    iconUrl:
      "https://cloud.shopback.com/raw/upload/static/images/icon/core/couch.svg"
  },
  {
    id: 11,
    name: "Sports & Outdoors",
    shortname: "sports-outdoors",
    priority: 11,
    href: "/all-stores/sports-outdoors",
    iconUrl:
      "https://cloud.shopback.com/raw/upload/static/images/icon/core/basketball.svg"
  }
]

export const fetchCategoryApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}
