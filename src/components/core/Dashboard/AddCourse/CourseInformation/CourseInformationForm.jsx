import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import ChipInput from './ChipInput';
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      console.log("categories", categories);
      if (categories?.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    }
    getCategories();
  }, [])

  return (
    <form

      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >

      {/* Course Title */}
      <div className='flex flex-col space-y-2'>
        <label htmlFor='courseTitle' className='text-sm text-richblack-5'>
          Course Title <sup className='text-pink-200'>*</sup>
        </label>
        <input
          id='courseTitle'
          placeholder='Enter Course Title'
          {...register("courseTitle", { required: true })}
          className='form-style w-full'
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>

      {/* Course Description */}
      <div className='flex flex-col space-y-2'>
        <label htmlFor='courseShortDesc' className='text-sm text-richblack-5'>
          Course Short Description <sup className='text-pink-200'>*</sup>
        </label>
        <textarea
          id='courseShortDesc'
          placeholder='Enter Description'
          {...register("courseShortDesc", { required: true })}
          className='form-style resize-x-none min-h-[130px] w-full'
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className='flex flex-col space-y-2'>
        <label htmlFor='coursePrice' className='text-sm text-richblack-5'>
          Course Price <sup className='text-pink-200'>*</sup>
        </label>
        <div className='relative'>
          <input
            id='coursePrice'
            placeholder='Enter Course Price'
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/, // Leading zero, Missing digits after ., Missing integer part before . are not allowed
              },
            })}
            className='form-style w-full !pl-12'
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id='courseCategory'
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className='form-style w-full'
        >
          <option value=" disabled">
            Choose a Category
          </option>
          {!loading && courseCategories?.map((category, index) => (
            <option key={index} value={category?._id}>
              {category?.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
    </form>
  )
}

export default CourseInformationForm