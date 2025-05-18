import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import { useSelector } from 'react-redux';
import Error from './Error';

const Catalog = () => {

  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const { loading } = useSelector((state) => state.profile);

  // fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id =
        response?.data?.data?.filter((category) => category.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCategoryId(category_id);
    }
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    if (categoryId) {
      const getCategoryDetails = async () => {
        try {
          const response = await getCatalogPageData(categoryId);
          console.log("PRinting res: ", res);
          setCatalogPageData(res);
        } catch (error) {
          console.log(error);
        }
      }
      getCategoryDetails();
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div>
      {/* Hero Section */}
      <div className='box-content bg-richblack-800 px-4'>
        <div className='mx-auto flex min-h-[260px] max-w-(--max-content-tab) lg:max-w-(--max-content) flex-col justify-center gap-4'>
          <p className='text-sm text-richblack-300'>
            {`Home / Catalog / `}
            <span>

            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Catalog