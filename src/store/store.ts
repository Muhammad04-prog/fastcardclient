import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, type Product } from "./productsSlice";

export type { Product };

export const ToDoData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.products.data) as Product[];
  const loading = useSelector((state: any) => state.products.loading) as boolean;

  const getData = async () => {
    dispatch(fetchProducts() as any);
  };

  return {
    data,
    loading,
    getData,
  };
};