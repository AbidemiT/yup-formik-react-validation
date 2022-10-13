import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import './App.css';

const validationSampleSchema = Yup.object().shape({
  firstName: Yup.string().min(1, 'First Name is too short!').required('First Name field is required'),
  lastName: Yup.string().min(1, 'Last Name is too short!').required('Last Name field is required'),
  email: Yup.string().email('Invalid email').required('Email field is required'),
  message: Yup.string().required('Message field is required')
})

function App() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({});

  const handleNext = (payload) => {
    setResult(payload)
    setShowResult(true);
  }

  return (
    <>
      <main>
        <div className='container'>
          <div className='row justify-content-center form-container'>
            <div className='col-md-6 mb-5'>
              <div className='heading text-center my-5'>
                <h1>Yup Formik Validation</h1>
              </div>
              <Formik
                // initial values, when trying to work on edit, this initialValues attribute comes in handy
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  message: ''
                }}

                // passing of our custom schema to the validationSchema attribute
                validationSchema={validationSampleSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {

                  // assigning our values from the fields to payload variable.
                  const payload = values;

                  handleNext(payload);

                  // Reseting our form fields to empty
                  resetForm({ values: "" });
                }}
              >
                {({
                  setFieldValue,
                  values,
                  errors,
                  touched,
                  handleSubmit
                }) => (
                  <>
                    <form>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className="form-group mb-3">
                            <label>First Name</label>
                            <Field className="form-control" name="firstName" value={values.firstName} placeholder="First Name" />
                            {errors.firstName && touched.firstName && (<small className="text-danger">{errors.firstName}</small>)}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className="form-group mb-3">
                            <label>Last Name</label>
                            <Field name="lastName" className="form-control" value={values.lastName} placeholder="Last Name" />
                            {errors.lastName && touched.lastName && (<small className="text-danger">{errors.lastName}</small>)}
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className="form-group mb-3">
                            <label>Email</label>
                            <Field type="email" className="form-control" value={values.email} name="email" placeholder="Email" />
                            {errors.email && touched.email && (<small className="text-danger">{errors.email}</small>)}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group mb-3">
                            <label>Drop Message</label>
                            <Field name="message">
                              {({
                                field,
                                meta,
                              }) => (
                                <div>
                                  <textarea className="form-control"
                                    name="message"
                                    id="message"
                                    placeholder="Type here"
                                    value={values.message}
                                    rows="3" {...field} ></textarea>
                                  {meta.touched && meta.error && (
                                    <small className="text-danger">{meta.error}</small>
                                  )}
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className='btn btn-sm btn-success' onClick={handleSubmit}>Submit</button>
                    </form>
                  </>
                )}

              </Formik>
            </div>
            {showResult ? <div className='col-md-12'>
              <div className='row justify-content-center '>
                <div className='col-md-6'>
                  <p>First Name: {result.firstName}</p>
                  <p>Last Name: {result.lastName}</p>
                  <p>Email Name: {result.email}</p>
                  <p>Message {result.message}</p>
                </div>
                <div className='col-md-12 text-center'>
                  <button className='btn btn-xs btn-danger' onClick={() => setShowResult(false)}>Hide Result</button>
                </div>
              </div>
            </div> : false}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
