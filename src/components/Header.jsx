import { MdPostAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showModal } from "../store/slices/modalSlice";
import { sortingDataFunc, searchDataFunc } from "../store/slices/dataSlices";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-indigo-700 text-white p-4">
      {/* Logo veya ana başlık */}
      <a href="/" className="text-4xl">
        Product-App
      </a>
      {/* Sıralama seçenekleri, arama kutusu ve yeni ürün ekleme butonu */}
      <div className="flex items-center gap-5 text-black">
        {/* Ürünleri sıralamak için açılır liste */}
        <select
          onChange={(e) => dispatch(sortingDataFunc(e.target.value))}
          className="h-10 rounded-lg p-1"
          name=""
          id=""
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input
          onChange={(e) => dispatch(searchDataFunc(e.target.value))}
          className="h-10 rounded-lg p-1"
          type="text"
          placeholder="Search..."
        />
        <div className="bg-indigo-800 h-12 w-12 grid place-items-center rounded-full ">
          <MdPostAdd
            onClick={() => dispatch(showModal())}
            className="cursor-pointer"
            size={35}
            color="white"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
