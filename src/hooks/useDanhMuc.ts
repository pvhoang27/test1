import useSWR from 'swr';
import type {
  TinhTPSearchParams,
  XaPhuongSearchParams,
} from '../types';
import { tinhTPApi, xaPhuongApi } from '../api/danhMucApi';

// ============ SWR Keys ============
export const SWR_KEYS = {
  tinhTP: (params: TinhTPSearchParams) => ['tinh-tp', params] as const,
  xaPhuong: (params: XaPhuongSearchParams) => ['xa-phuong', params] as const,
  tinhTPAll: () => ['tinh-tp-all'] as const,
};

// ============ Hook Tỉnh / TP ============
export function useTinhTP(params: TinhTPSearchParams) {
  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.tinhTP(params),
    () => tinhTPApi.search(params),
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

// ============ Hook All Tỉnh / TP (cho dropdown) ============
export function useTinhTPAll() {
  const { data, error, isLoading } = useSWR(
    SWR_KEYS.tinhTPAll(),
    () => tinhTPApi.getAll(),
    { revalidateOnFocus: false }
  );

  return {
    tinhTPList: data ?? [],
    isLoading,
    isError: !!error,
  };
}


// ============ Hook Xã / Phường ============
export function useXaPhuong(params: XaPhuongSearchParams) {
  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.xaPhuong(params),
    () => xaPhuongApi.search(params),
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
