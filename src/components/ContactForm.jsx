import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// we import React, useState functionality and Validation Packages 
// We need Formik and Yup to validate that the user is filling in the information correctly so we can give them a confirmation

const SignupSchema = Yup.object().shape({
    //yup validation - here we set criteria what we want the user to type
  fullName: Yup.string()
    .min(1, 'The name seems to be too short')
    .max(50, 'The entry seems to be too long')
    .required('Your name is required'),
    //it is a simple form so we assume that all information is required to gather from the user

  email: Yup.string().email('The email is not valid').required('Please type your email'),
  //for email we need the @ symnbol so that is why we email('Invalid email')

  notes: Yup.string()
  .min(20, 'Please write us a longer message')
  .required('Let us know how we can help'),
});

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [count, setCount] = useState(0);
    // we are setting state where needed so we can change it later

    const handleSubmit = (e) => {
        setSubmitted(true);
    };

    const handleCount = (e) => {
        // This function changes the state of the counter so it reflects the number of characters. 
        // It looks like a bit too complex way to write this - normally I would simply use 
        // onChange={() => { setCount(e.target.value.length ) }. However, this function does not work as 
        // Formik handles value itself and using value here breaks the code.
        // For whatever reason though onKeyDown works with some modifications.

        const x = e.keyCode;
        // selecting backspace key
        if (x === 8 && count >= 1) { setCount(count - 1) }
        // if we press backspace key, count decreases
        else if (x === 8 && count === 0) { setCount(0) }
        else { setCount(e.target.value.length + 1) }
        // if we type text count increases
    }

return (
  <div className ="form">
    <h1>Send Us a Message!</h1>
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        notes: '',
      }}
    //   here we define the values that we collect
      validationSchema={SignupSchema}
    //   onSubmit={values => {
    //     console.log(values);
    //   }}
      onSubmit={handleSubmit}
    //   if valifation goes through, we call the handleSubmit function onSubmit
    >
      {({ errors, touched }) => (
        <Form className="form__content">
                {/* I decided to use BEM here which makes SCSS well targetted and readable, 
                possibly not necessary for a project foor this scale but a good practice. */}
                <div className="form__contact-field-box">
                    <div>
                        <Field name="fullName" className="form__input" placeholder="Full Name" aria-label="Full Name"/>
                        {errors.fullName && touched.fullName ? (<div className="form__error-message">{errors.fullName}</div>) : null}
                        {/* this is linked to Yup. if the validation does not go through an error will be displayed */}
                    </div>
                    <div>
                        <Field name="email" type="email" placeholder="Email" aria-label="email" className="form__input" />
                        {errors.email && touched.email ? <div className="form__error-message">{errors.email}</div> : null}
                    </div>
                </div>
                <Field  component="textarea" name="notes" className="form__input form__textarea" placeholder="How can we help you today?"  
                        aria-label="notes" onKeyDown={(e) => { handleCount(e)}} />
                    {/* apart from collecting the data we are tryggering the increased count by typing  */}
                    {/* We also need to convert the input to textarea */}
                <div className="form__counter">Number of characters: {count}</div>
                    {errors.notes && touched.notes ? (<div className="form__error-message">{errors.notes}</div> ) : null}
                <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
    <p>{submitted ? <div className="form__submit-message">Message submitted, we will get back to you soon!</div> : null}</p>
    {/* if the form is validated and successfully submitted, we will display a message to the user that the form was submitted,
    if form is not validated, the message will not be diaplayed */}
  </div>
)
};

export default ContactForm