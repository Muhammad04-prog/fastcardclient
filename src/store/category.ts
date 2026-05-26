import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, type CategoryData } from "./categorySlice";

export type { CategoryData };

export const CategoryToDo = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.category.data) as CategoryData[];
  const loading = useSelector((state: any) => state.category.loading) as boolean;

  const getData = async () => {
    dispatch(fetchCategories() as any);
  };

  return {
    data,
    loading,
    getData,
  };
};