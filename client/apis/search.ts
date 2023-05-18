import request from 'superagent'

import { Result } from '../../models/externalSearch'

export async function getArtworksFromSearch(search: string): Promise<Result[]> {
  const response = await request.get('/api/v1/search').query({ search: search })
  return response.body
}
