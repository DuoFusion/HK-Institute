import { InvalidateQueryFilters, QueryKey, useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
// import { AntdNotification, ErrorMessage } from "../../Utils/toast";
import { useAppDispatch } from "../../ReduxToolkit/Hooks";
import { CombinedErrorResponse } from "../../Types";
import { HTTP_STATUS, RouteList } from "../../Constant";
import { logout } from "../../ReduxToolkit/Slice/AuthSlice";

function useApiDelete<TInput, TResponse>(mutationKey: QueryKey, callback: (input: TInput) => Promise<TResponse>, options?: UseMutationOptions<TResponse, CombinedErrorResponse, TInput>) {
  const q = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return useMutation<TResponse, CombinedErrorResponse, TInput>({
    mutationKey,
    mutationFn: callback,
    ...options,
    onSuccess: (data, variables, context) => {
      for (let i = 1; i < mutationKey.length; i++) {
        q.invalidateQueries({ queryKey: [mutationKey[i]] } as InvalidateQueryFilters);
      }
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error: CombinedErrorResponse) => {
      switch (error.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          dispatch(logout());
          navigate(RouteList.Login + `?returnUrl=${window.location.pathname}`, {
            replace: true,
          });
          break;
        default:
          // AntdNotification(notification, "error", ErrorMessage(error));
          break;
      }
    },
  });
}

export default useApiDelete;
