import { ResponseWith } from "@/types/response";
import api from "./api";
import { Category } from "@/types/category";
const getAllCategory = async () => {
    const response = await api.get<ResponseWith<Category[]>>("/category/all");
    return response.data.data;
  };
  const CategoryService = {
    getAllCategory
  };
  
  export default CategoryService;