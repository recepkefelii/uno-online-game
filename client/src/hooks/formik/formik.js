import {useCallback} from 'react';
import {useFormik} from 'formik';

export const useValidation = (initialValues, validationSchema, onSubmit) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      formik.handleSubmit(e);
    },
    [formik.handleSubmit],
  );

  return {
    values: formik.values,
    errors: formik.errors,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleSubmit,
  };
};
