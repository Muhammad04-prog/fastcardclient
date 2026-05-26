import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfiles, type AccountData } from "./accountSlice";

export type { AccountData };

export const ToDoAccount = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.account.data) as AccountData | null;
  const loading = useSelector((state: any) => state.account.loading) as boolean;
  const error = useSelector((state: any) => state.account.error) as string | null;

  const getData = async () => {
    dispatch(fetchUserProfiles() as any);
  };

  return {
    data,
    loading,
    error,
    getData,
  };
};