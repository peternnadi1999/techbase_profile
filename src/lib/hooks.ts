import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "../type";

export function useGet<T>(
	key: string[],
	endpoint: string,
	options?: {
		enabled?: boolean;
		staleTime?: number;
	},
) {
	return useQuery({
		queryKey: key,
		queryFn: () => apiClient.get<ApiResponse<T>>(endpoint),
		enabled: options?.enabled ?? true,
		staleTime: options?.staleTime ?? 0,
	});
}

export function usePost<TData, TVariables>(
  endpoint: string,
  options?: {
    invalidateQueries?: string[][];
    onSuccess?: (data: ApiResponse<TData>) => void;
    onError?: (error: Error) => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TVariables) =>
      apiClient.post<ApiResponse<TData>>(endpoint, data),

    onSuccess: (response) => {
      options?.invalidateQueries?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      options?.onSuccess?.(response);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

export function usePatch<TData, TVariables>(
  endpoint: string,
  options?: {
    invalidateQueries?: string[][];
    onSuccess?: (data: ApiResponse<TData>) => void;
    onError?: (error: Error) => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TVariables) =>
      apiClient.patch<ApiResponse<TData>>(endpoint, data),

    onSuccess: (response) => {
      options?.invalidateQueries?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      options?.onSuccess?.(response);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

export function useDelete<TData>(
  endpoint: string,
  options?: {
    invalidateQueries?: string[][];
    onSuccess?: (data: ApiResponse<TData>) => void;
    onError?: (error: Error) => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient.delete<ApiResponse<TData>>(endpoint),

    onSuccess: (response) => {
      options?.invalidateQueries?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      options?.onSuccess?.(response);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}
