import { useDispatch, useSelector } from "react-redux";
import { wishlistActions, type WishlistItem } from "./wishlistSlice";

export type { WishlistItem };

interface RootState {
  wishlist: {
    items: WishlistItem[];
  };
}

export const ToDoWishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.wishlist.items);

  return {
    items,
    initWishlist: () => {
      dispatch(wishlistActions.initWishlist());
    },
    isInWishlist: (productId: number): boolean => {
      return items.some((item) => item.id === productId);
    },
    addToWishlist: (product: WishlistItem) => {
      dispatch(wishlistActions.addToWishlist(product));
    },
    removeFromWishlist: (productId: number) => {
      dispatch(wishlistActions.removeFromWishlist(productId));
    },
    toggleWishlist: (product: WishlistItem) => {
      dispatch(wishlistActions.toggleWishlist(product));
    },
    getWishlistItems: (): WishlistItem[] => {
      return items;
    },
    clearWishlist: () => {
      dispatch(wishlistActions.clearWishlist());
    },
  };
};
