import React from "react";
import ShopBanner from "../modules/shop/ShopBanner";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { FooterIconContact } from "../components/icon/IconContact";
import { useDispatch, useSelector } from "react-redux";
import TableWishlist from "../components/table/TableWishlist";
import BoxNoItem from "../components/BoxNoItem";
import { useQuery } from "@tanstack/react-query";
import { getWishlistByUserId } from "../service/wishlistService";
import { setWishlist } from "../redux/slice/wishlistSlice";

const WishlistPage = () => {
  const users = useSelector((state) => state.user);
  const { wishlistArray } = useSelector((state) => state.store);

  const fetchAllWishlist = async (context) => {
    const userId = context?.queryKey[1];
    const res = await getWishlistByUserId(userId);
    return res;
  };
  const { data: wishlists, isLoading } = useQuery({
    queryKey: ["products", users?.id],
    queryFn: fetchAllWishlist,
    retry: 3,
    retryDelay: 1000,
    enabled: !!users?.id,
  });

  console.log(wishlists);

  return (
    <div>
      <ShopBanner title="wishlist" />
      <Breadcrumb children="shop" url="Wishlist" />
      <div className="container">
        {/* table */}
        {wishlists?.length === 0 || wishlists === null ? (
          <BoxNoItem type="wishlists"></BoxNoItem>
        ) : (
          <div>
            <TableWishlist Wishlists={wishlists}></TableWishlist>
            <div className="flex items-center gap-5 my-20">
              <span className="text-base text-gray text-opacity-60">
                Share on:
              </span>
              <div className="flex items-center gap-2">
                {FooterIconContact.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center p-3 bg-white border rounded-full text-gray border-gray hover:text-yellowColor hover:border-yellowColor"
                  >
                    {item.icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;

// if (!productId || !user) return;
// try {
//   const wishlistRef = collection(db, "wishlists");
//   const queryWishlists = query(
//     wishlistRef,
//     where("productId", "==", productId),
//     where("userId", "==", user.uid)
//   );
//   const querySnapshot = await getDocs(queryWishlists);
//   querySnapshot.forEach(async (doc) => {
//     try {
//       await deleteDoc(doc.ref);
//       toast.success("Remove from wishlist success!");
//     } catch (error) {
//       console.log("Error removing document: ", error);
//     }
//   });
// } catch (error) {
//   console.log(error);
