import { useDispatch, useSelector } from "react-redux";
import { cartActions, addCartThunk, type CartItem } from "./cartSlice";

export type { CartItem };

export const ToDoCart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.cart.data) as CartItem[];
  const loading = useSelector((state: any) => state.cart.loading) as boolean;

  return {
    data,
    loading,
    getData: async () => {
      dispatch(cartActions.getData());
    },
    addCart: async (id: string | number): Promise<boolean> => {
      const result = await dispatch(addCartThunk(id) as any);
      if (addCartThunk.fulfilled.match(result)) {
        return true;
      }
      return false;
    },
    deleteCart: async (id: string | number) => {
      dispatch(cartActions.deleteCart(id));
    },
    increaseCart: async (id: string | number) => {
      dispatch(cartActions.increaseCart(id));
    },
    reduceCart: async (id: string | number) => {
      dispatch(cartActions.reduceCart(id));
    },
    clearCart: async () => {
      dispatch(cartActions.clearCart());
    },
  };
};