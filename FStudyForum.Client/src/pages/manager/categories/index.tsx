import { useState } from "react";
import AddCategoryPopup from "@/components/category/Add";
import DeleteCategoryPopup from "@/components/category/Delete";
import UpdateCategoryPopup from "@/components/category/Update";
import { cn } from "@/helpers/utils";
import { Category } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { ChevronsUpDown, Pencil, Plus, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import CategoryService from "@/services/CategoryService";

const titles = ["Name", "Description", "Types", "Action"];
const PAGE_SIZE = 5; // Number of items per page

const CategoriesPage = () => {
  const [popupOpen, setPopupOpen] = useState(0);
  const [selectCategory, setSelectCategory] = useState<Category | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetching categories with react-query
  const { data, isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryService.getAllCategory
  });

  const totalPages = Math.ceil((data?.length ?? 0) / PAGE_SIZE);

  // Paginate data based on current page
  const paginatedData = data?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Open different popups
  const openAddPopup = () => setPopupOpen(1);
  const openEditPopup = (category: Category) => {
    setSelectCategory(category);
    setPopupOpen(2);
  };
  const openDeletePopup = (category: Category) => {
    setSelectCategory(category);
    setPopupOpen(3);
  };
  const closePopup = () => setPopupOpen(0);

  const reloadCategory = () => {
    // Optional: Implement logic to refresh categories if needed
  };

  // Delete category handler
  const handleDelete = async () => {
    if (!selectCategory) return;
    try {
      await CategoryService.deleteCategory(selectCategory.name);
      closePopup();
      reloadCategory();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Categories list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all categories
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="gradient"
                className="flex items-center gap-2 capitalize text-sm"
                color="orange"
                onClick={openAddPopup}
              >
                <Plus strokeWidth={3} className="h-4 w-4" /> Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-hidden px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {titles.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== titles.length - 1 && (
                        <ChevronsUpDown strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={cn(isLoading && "hidden")}>
              {paginatedData?.map((category, index) => {
                const isLast = index === paginatedData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={category.name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {category.name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={`${classes} break-words max-w-60`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {category.description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {category.type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit category">
                        <IconButton
                          variant="text"
                          onClick={() => openEditPopup(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Delete category">
                        <IconButton
                          variant="text"
                          onClick={() => openDeletePopup(category)}
                        >
                          <Trash className="h-4 w-4 text-red-400" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 inline" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 mx-1 text-sm rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4 inline" />
            </button>
          </div>
        </CardBody>
      </Card>
      {popupOpen === 1 && (
        <AddCategoryPopup
          onClose={closePopup}
          onCategoryCreated={reloadCategory}
          open={true} 
        />
      )}

      {popupOpen === 2 && selectCategory && (
        <UpdateCategoryPopup
          open={true}
          category={selectCategory}
          onClose={closePopup}
          onUpdate={reloadCategory}
        />
      )}

      {popupOpen === 3 && selectCategory && (
        <DeleteCategoryPopup
          open={true}
          onClose={closePopup}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default CategoriesPage;
