import React from 'react'
import { withFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = withFormik({
  mapPropsToValues({ name, email, password }) {
    return {
      name: name || "",
      email: email || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required('@'),
    password: Yup.string()
      .min(6)
      .required()
  }),

  handleSubmit(values) {
    console.log(values);
  }
})(UserForm);



const validate = ({name, email, password, terms}) => {
  const errors = {};
  if (!name) {
    errors.name = "enter a name !"
  }
  if (!email) {
    errors.email = "enter email !"
  }
  if (!password) {
    errors.password = "enater a password !"
  } else if (password.length < 8 ) {
    errors.password = "your password must be more than 8 characters"
  }
  if (!terms){
    errors.terms = "Please read the terms and accept it"
  }
  return errors
}


function UserForm() {

    return (
        <Formik 
          initialValues = {{ name: '', email: '' , password: '', terms: false }}
          onSubmit = {(values, tools) => {
            console.log(values, tools)
            tools.resetForm();
          }}
          validate = {validate}
          render = {props => {
            return (
              <Form>
                <label name = "name">Name: </label>
                <Field id = "name" placeholder = "enter name" name = "name" />
                <ErrorMessage name = "name" component = "span" className = "error" /><br />

                <label name = "email">Email: </label>
                <Field id = "email" placeholder = "enter email" name = "email" />
                <ErrorMessage name = "email" component = "span" className = "error" /><br />

                <label name = "password">Password: </label>
                <Field id = "password" type = "password" placeholder = "enter password" name = "password" />
                <ErrorMessage name = "password" component = "span" className = "error" /><br />


                <Field id  = "terms" type = "checkbox" />
                <label name = "terms">I accepte </label>
                <ErrorMessage name = "terms" component = "span" className = "error" /><br />



                <input id = "submit" type = "submit" />
              </Form>
            )
          }
    
          }
        />
      );
}


export default FormikForm