import React, { useState } from 'react';
import IconBtn from "../../../../common/IconBtn";
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from "react-icons/io5";

const CourseBuilderForm = () => {

  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
      <form className='space-y-4'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor="sectionName" className="text-sm text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
        </div>
      </form>
    </div>
  )
}

export default CourseBuilderForm