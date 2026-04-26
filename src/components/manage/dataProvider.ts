'use client'

import type {
  BaseRecord,
  CreateParams,
  DataProvider,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
} from '@refinedev/core'

type ListResponse<T = BaseRecord> = {
  docs?: T[]
  totalDocs?: number
}

const parseResponse = async <T,>(response: Response): Promise<T> => {
  const body = (await response.json().catch(() => ({}))) as { error?: string }

  if (!response.ok) {
    throw new Error(body.error || `Request failed with status ${response.status}`)
  }

  return body as T
}

const buildListURL = (resource: string, params: Omit<GetListParams, 'resource'>): string => {
  const url = new URL(`/manage/api/${resource}`, window.location.origin)
  const current = params.pagination?.currentPage || 1
  const pageSize = params.pagination?.pageSize || 10

  url.searchParams.set('page', String(current))
  url.searchParams.set('limit', String(pageSize))

  const sorter = params.sorters?.[0]
  if (sorter?.field) {
    url.searchParams.set('sort', sorter.order === 'asc' ? sorter.field : `-${sorter.field}`)
  }

  for (const filter of params.filters || []) {
    if ('field' in filter && filter.value !== undefined && filter.value !== null && filter.value !== '') {
      url.searchParams.set(String(filter.field), String(filter.value))
    }
  }

  return url.toString()
}

export const payloadManageDataProvider: DataProvider = {
  getApiUrl: () => '/manage/api',

  getList: async <TData extends BaseRecord = BaseRecord>({ resource, ...params }: GetListParams) => {
    const response = await fetch(buildListURL(resource, params), { credentials: 'include' })
    const body = await parseResponse<ListResponse<TData>>(response)

    return {
      data: body.docs || [],
      total: body.totalDocs || 0,
    }
  },

  getOne: async <TData extends BaseRecord = BaseRecord>(params: GetOneParams) => {
    const { resource, id } = params
    const response = await fetch(`/manage/api/${resource}/${id}`, { credentials: 'include' })
    const body = await parseResponse<{ doc: TData }>(response)

    return { data: body.doc }
  },

  create: async <TData extends BaseRecord = BaseRecord, TVariables = Record<string, unknown>>(
    params: CreateParams<TVariables>,
  ) => {
    const { resource, variables } = params
    const response = await fetch(`/manage/api/${resource}`, {
      body: JSON.stringify(variables),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    const body = await parseResponse<{ doc: TData }>(response)

    return { data: body.doc }
  },

  update: async <TData extends BaseRecord = BaseRecord, TVariables = Record<string, unknown>>(
    params: UpdateParams<TVariables>,
  ) => {
    const { resource, id, variables } = params
    const response = await fetch(`/manage/api/${resource}/${id}`, {
      body: JSON.stringify(variables),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    })
    const body = await parseResponse<{ doc: TData }>(response)

    return { data: body.doc }
  },

  deleteOne: async <TData extends BaseRecord = BaseRecord, TVariables = Record<string, unknown>>(
    params: DeleteOneParams<TVariables>,
  ) => {
    const { resource, id } = params
    const response = await fetch(`/manage/api/${resource}/${id}`, {
      credentials: 'include',
      method: 'DELETE',
    })
    const body = await parseResponse<{ doc: TData }>(response)

    return { data: body.doc }
  },
}
