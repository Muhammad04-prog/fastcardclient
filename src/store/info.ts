import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "./infoSlice";
import { type Product } from "./productsSlice";

export const infoData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.info.data) as Product[];
  const loading = useSelector((state: any) => state.info.loading) as boolean;

  const infoUser = async (id: string | number) => {
    dispatch(fetchProductById(id) as any);
  };

  return {
    data,
    loading,
    infoUser,
  };
};