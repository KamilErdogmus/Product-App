import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { removeDataFunc } from "../store/slices/dataSlices";
import { showModal } from "../store/slices/modalSlice";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";

const ProductCard = ({ d }) => {
  const dispatch = useDispatch(); //* Redux dispatch fonksiyonunu kullanmak için
  const navigate = useNavigate(); //* React Router navigate fonksiyonunu kullanmak için
  const [edit, setEdit] = useState(false); //* Ürün kartının düzenleme modunda olup olmadığını takip eden state

  //* Ürünü güncellemek için modalı açma ve düzenleme modunu kapatma fonksiyonu
  const updateFunc = () => {
    dispatch(showModal()); //* Modalı açmak için Redux action dispatch
    setEdit(false); //* Düzenleme modunu kapat
    navigate(`?update=${d.id}`); //* URL'yi güncelleme moduna geçmek için değiştir
  };

  return (
    <div className="w-[200px] h-[200px] relative m-6 rounded-md card">
      <img
        src={d?.url}
        alt="photo"
        className="w-full h-full object-cover rounded-md"
      />
      <div className="absolute left-0 bottom-0 bg-indigo-600 rounded-md text-white w-full">
        <p className="font-semibold text-2xl">{d?.name}</p>
        <p className="text-lg text-green-300">${d?.price}</p>
      </div>
      <div className="absolute top-0 right-2">
        <BsThreeDots onClick={() => setEdit(!edit)} size={32} color={"gray"} />
      </div>
      {edit && (
        <div className="text-white absolute top-5 right-2 grid gap-1 mt-2">
          <Button
            onClick={() => {
              dispatch(removeDataFunc(d?.id)),
                Store.addNotification({
                  message: "Item Deleted!",
                  type: "danger",
                  container: "center",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 5000,
                    onScreen: true,
                  },
                }),
                navigate("/");
            }}
            size={24}
            btnText={"Delete"}
          />
          <Button onClick={updateFunc} size={24} btnText={"Update"} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
