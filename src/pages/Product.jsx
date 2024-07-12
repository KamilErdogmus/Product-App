import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Modal from "./../components/Modal";
import { addDataFunc, updateDataFunc } from "../store/slices/dataSlices";
import { useEffect, useState } from "react";
import Input from "./../components/Input";
import Button from "./../components/Button";
import { showModal } from "../store/slices/modalSlice";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";

const Product = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { modal } = useSelector((store) => store.modal);
  const { data, keyword } = useSelector((store) => store.data);

  //* Ürün bilgilerini saklamak için local state
  const [info, setInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  //* Yeni ürün ekleme işlemi
  const handleClick = () => {
    //* Yeni ürünü eklemek için Redux action dispatch et
    dispatch(addDataFunc({ ...info, id: data.length + 1 }));
    dispatch(showModal());
    setInfo({ name: "", price: "", url: "" });
    navigate("/");
    Store.addNotification({
      title: "Wonderful!",
      message: "Item added successfully",
      type: "success",
      insert: "top",
      container: "center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  //* Form inputlarının değerlerini güncelleme
  const handleChange = (e, type) => {
    if (type === "url") {
      //* Eğer input türü "url" ise (file input)
      //* URL.createObjectURL() ile dosyanın geçici bir URL'sini oluştur
      //* ve state'i güncelle. Bu, yüklenen dosyanın yerel bir URL'sini sağlar.
      setInfo((state) => ({
        ...state,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      //* Eğer input türü "url" değilse, text input gibi diğer türler
      //* state'i güncelle ve inputun adını ve değerini state'e set et
      setInfo((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
  };

  //* URL'den ürün id'sini almak için
  let loc = location?.search.split("=")[1];

  useEffect(() => {
    if (loc) {
      //* Eğer güncellenecek bir ürün varsa, ürünü state'e set et
      setInfo(data.find((data) => data.id === Number(loc)));
    }
  }, [loc, data]);

  //* Ürün güncelleme işlemi
  const updateFunc = () => {
    dispatch(
      updateDataFunc({
        ...info,
        id: Number(loc),
      })
    );
    dispatch(showModal());
    setInfo({ name: "", price: "", url: "" });
    navigate("/");
    Store.addNotification({
      title: "Info!",
      message: "Item updated",
      type: "info",
      insert: "top",
      container: "center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  const contentModal = (
    <>
      <Input
        placeholder={loc ? "Update Name" : "Add a Product"}
        type={"text"}
        name={"name"}
        value={info?.name || ""}
        id={"name"}
        onChange={(e) => handleChange(e, "name")}
      />
      <Input
        placeholder={loc ? "Update Price" : "Add a Price"}
        name={"price"}
        type={"text"}
        id={"price"}
        value={info?.price || ""}
        onChange={(e) => handleChange(e, "price")}
      />
      <Input
        name={"url"}
        type={"file"}
        id={"url"}
        onChange={(e) => handleChange(e, "url")}
      />

      <Button
        btnText={loc ? "Update" : "Add"}
        onClick={loc ? updateFunc : handleClick}
      />
    </>
  );

  //* Arama sonucuna göre filtrelenmiş ürünler
  const filteredItems = data.filter((data) =>
    data.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="bg-zinc-300 h-screen ">
      {data.length === 0 && (
        <h1 className="text-center pt-6 text-5xl">Please Add a Product...</h1>
      )}
      <>
        <div className="flex flex-wrap items-center gap-3">
          {filteredItems.map((d, i) => (
            <ProductCard key={i} d={d} />
          ))}
        </div>
        {modal && (
          <Modal
            title={loc ? "Update Product" : "Add a Product"}
            content={contentModal}
          />
        )}
      </>
    </div>
  );
};

export default Product;
