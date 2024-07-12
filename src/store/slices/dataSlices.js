import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  keyword: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    //* Yeni bir ürün ekleme işlemi
    addDataFunc: (state, action) => {
      //* Mevcut ürün listesine yeni ürünü ekle
      state.data = [...state.data, action.payload];
    },
    //* Bir ürünü silme işlemi
    removeDataFunc: (state, action) => {
      //* Verilen id'ye sahip ürünü listeden çıkar
      state.data = state.data.filter((data) => data.id !== action.payload);
    },
    //* Bir ürünü güncelleme işlemi
    updateDataFunc: (state, action) => {
      //* Güncellenecek ürünün indeksini bul
      const index = state.data.findIndex(
        (data) => data.id === action.payload.id
      );
      //* Eğer ürün bulunursa, eski ürünü yeni ürünle değiştir
      if (index !== -1) {
        state.data.splice(index, 1, action.payload);
      }
    },
    //* Ürünleri fiyatlarına göre sıralama işlemi
    sortingDataFunc: (state, action) => {
      //* Sıralama yönüne göre ürünleri sırala (artan veya azalan)
      state.data.sort((a, b) =>
        action.payload === "asc"
          ? a.price - b.price
          : action.payload === "desc"
          ? b.price - a.price
          : null
      );
    },
    //* Arama işlemi için anahtar kelimeyi güncelleme
    searchDataFunc: (state, action) => {
      //* Arama anahtar kelimesini güncelle
      state.keyword = action.payload;
    },
  },
});

export const {
  addDataFunc,
  removeDataFunc,
  updateDataFunc,
  sortingDataFunc,
  searchDataFunc,
} = dataSlice.actions;

export default dataSlice.reducer;
