import AddCategoryPopup from "@/components/category/Add";
import DeleteCategoryPopup from "@/components/category/Delete";
import UpdateCategoryPopup from "@/components/category/Update";
import { cn } from "@/helpers/utils";
import { Category} from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  //Chip,
  CardFooter,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { ChevronsUpDown, 
  Pencil, 
  Plus, 
  Trash 
  } from "lucide-react";
import React from "react";
import CategoryService from "@/services/CategoryService";

const titles = ["Name", "Description","Types", "Action"];

const CategoriesPage = () => {
  const openAddPopup = () => {
    setPopupOpen(1);
  };

  const openEditPopup = (category: Category) => {
    setSelectCategory(category);
    setPopupOpen(2);
  };

  const openDeletePopup = (category: Category) => {
    setSelectCategory(category);
    setPopupOpen(3);
  };
  const closePopup = () => {
    setPopupOpen(0);
  };

  const reloadCategory = () => {
    // setReload(true);
  };

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

  const [selectCategory, setSelectCategory] = React.useState<Category | undefined>(
    undefined
  );
  const [popupOpen, setPopupOpen] = React.useState(0);

   const { data, isLoading } = useQuery({
     queryKey: ["categories"],
     queryFn: CategoryService.getAllCategory
  });
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
                See information about all Categories
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
              {data?.map((categories, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={categories.name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {categories.name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {categories.description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {categories.type}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>   
                    </td>
                    <td className={cn(classes)}>
                      <Tooltip content="Edit category">
                        <IconButton
                          variant="text"
                          onClick={() => openEditPopup(categories)}
                        >
                          <Pencil className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Delete categories">
                        <IconButton
                          variant="text"
                          onClick={() => openDeletePopup(categories)}
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
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      {popupOpen === 1 && (
        <AddCategoryPopup onClose={closePopup} onCategoryCreated={reloadCategory} />
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
          open ={true}
          onClose={closePopup}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
export default CategoriesPage;
