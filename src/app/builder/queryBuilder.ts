import { FilterQuery, Query } from 'mongoose'

const buildQuery = async <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
  searchAbleFields: string[],
) => {
  // searchQuery
  let queryConstructor = modelQuery.find()
  let searchTerm = ''
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
    queryConstructor = queryConstructor.find({
      $or: searchAbleFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    } as FilterQuery<T>)
  }

  //filter query
  const queryObj = { ...query }
  const excludesFields = [
    'searchTerm',
    'sort',
    'limit',
    'page',
    'skip',
    'fields',
  ]
  excludesFields.forEach(ele => delete queryObj[ele])

  // Handle min and max price filters
  if (query?.minPrice || query?.maxPrice) {
    const priceFilter: { $gte?: number; $lte?: number } = {}

    // Convert minPrice and maxPrice to numbers
    const minPrice = Number(query.minPrice)
    const maxPrice = Number(query.maxPrice)

    // Only apply the filters if minPrice and maxPrice are valid numbers
    if (!isNaN(minPrice)) {
      priceFilter.$gte = minPrice // Greater than or equal to minPrice
    }
    if (!isNaN(maxPrice)) {
      priceFilter.$lte = maxPrice // Less than or equal to maxPrice
    }

    // Apply the price filter to the 'price' field
    if (Object.keys(priceFilter).length > 0) {
      queryObj['price'] = priceFilter
    }

    // Remove minPrice and maxPrice from queryObj as they are now processed
    delete queryObj.minPrice
    delete queryObj.maxPrice
  }

  queryConstructor = queryConstructor.find(queryObj as FilterQuery<T>)

  // queryConstructor = queryConstructor.find(queryObj as FilterQuery<T>)

  //sort query
  let sort = '-createdAt'
  if (query?.sort) {
    sort = (query?.sort as string).split(',').join(' ')
    queryConstructor = queryConstructor.sort(sort)
  }

  //paginate query
  let limit = 1
  let page = 1
  let skip = 0
  if (query?.limit) {
    limit = Number(query?.limit)
    queryConstructor = queryConstructor.limit(limit)
  }
  if (query?.page) {
    page = Number(query?.page)
    skip = (page - 1) * limit
    queryConstructor = queryConstructor.skip(skip)
  }

  //fields filtering
  let fields = '-__v'
  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ')
    queryConstructor = queryConstructor.select(fields)
  }

  return queryConstructor
}

export default buildQuery
