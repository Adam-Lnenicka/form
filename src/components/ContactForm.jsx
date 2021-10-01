import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// we import React, useState functionality and Validation Packages 
// We need Formik and Yup to validate that the user is filling in the information correctly so we can give them a confirmation

const SignupSchema = Yup.object().shape({
    //yup validation - here we set criteria what we want the user to type
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    //it is a simple form so we assume that all information is required to gather from the user

  email: Yup.string().email('Invalid email').required('Required'),
  //for email we need the @ symnbol so that is why we email('Invalid email')

  notes: Yup.string()
  .min(2, 'Too Short!')
  .max(300, 'Too Long!')
  .required('Required'),
});

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [count, setCount] = useState(0);
    // we are setting state where needed so we can change it later

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };




return (
  <div className ="form">
    <h1>Send Us a Message!</h1>
    <Formik
      initialValues={{
        firstName: '',
        email: '',
        notes: '',
      }}
    //   here we define the values that we collect
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
            <div className="form__content">
                {/* I decided to use BEM here which makes SCSS well targetted and readable, 
                possibly not necessary for a project foor this scale but a good practice. */}
                <Field name="firstName" />
                    {errors.firstName && touched.firstName ? (
                        <div>{errors.firstName}</div>
                    ) : null}
                    {/* this is linked to Yup. if the validation does not go through an error will be displayed */}
                <Field name="email" type="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button>
                <Field component="textarea" name="notes" placeholder="notes" onKeyDown={(e) => { handleCount(e)}} />
                    {/* apart from collecting the data we are tryggering the increased count by typing  */}
                    {/* We also need to convert the input to textarea */}
                    {count}
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null}
            </div>
        </Form>
      )}
    <h3>{submitted ? 'Thank you for contacting us, we will get back to you soon!' : null}</h3>
    {/* if the form is validated and successfully submitted, we will display a message to the user that the form was submitted,
    if form is not validated, the message will not be diaplayed */}
    </Formik>
  </div>
)
};

export default ContactForm