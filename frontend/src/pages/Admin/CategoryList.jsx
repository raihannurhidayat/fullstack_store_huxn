import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import { useState } from "react";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchAllCategoryQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category Name is Required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is Created`);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating Category Failed, try again");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updateCategory: { name: updatingName },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
        refetch()
      }
    } catch (error) {
      console.log(error);
      toast.error("Updating Category Failed, try again");
    }
  };

  const handlerDeleteCategory = async(e) => {
    e.preventDefault()

    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${selectedCategory.name} deleted Success`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
        refetch()
      }
    } catch (error) {
      console.log(error);
      toast.error("Updating Category Failed, try again");
    }

  }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 hover:bg-pink-500 m-3 hover:text-white"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handlerDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
