import { useSelector } from "react-redux";

export function useCheckFavorite(wishlistId) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const isFavorite = wishlist.some(
    (items) => items == wishlistId
  );
  return isFavorite;
}
