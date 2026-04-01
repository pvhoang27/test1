import useSWR from 'swr';
import type {
  ProvinceSearchParams,
  WardSearchParams,
} from '../types';
import { provinceApi, wardApi } from '../api/catalogApi';

// ============ SWR Keys ============
export const SWR_KEYS = {
  province: (params: ProvinceSearchParams) => ['province', params] as const,
  ward: (params: WardSearchParams) => ['ward', params] as const,
  provinceAll: () => ['province-all'] as const,
};

// ============ Province Hook ============
export function useProvince(params: ProvinceSearchParams) {
  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.province(params),
    () => provinceApi.search(params),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return {
    data: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError: !!error,
    mutate,
  };
}

// ============ Province List Hook (for dropdown) ============
export function useProvinceAll() {
  const { data, error, isLoading } = useSWR(
    SWR_KEYS.provinceAll(),
    () => provinceApi.getAll(),
    { revalidateOnFocus: false }
  );

  return {
    provinceList: data ?? [],
    isLoading,
    isError: !!error,
  };
}


// ============ Ward Hook ============
export function useWard(params: WardSearchParams) {
  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.ward(params),
    () => wardApi.search(params),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return {
    data: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError: !!error,
    mutate,
  };
}
