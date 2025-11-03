import React from 'react'
import { useForm } from 'react-hook-form';
import StudentSummary from './StudentSummary';

function StudentRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({
    mode : 'onChange'
  });

  // const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    // setSubmittedData(data);
    reset();
  }
  const validateAge = (value) => {
    const dob = new Date(value);
    const today = new Date();
    const year = today.getFullYear() - dob.getFullYear();
    return (year >= 18 && year <= 60) || ("Age must be between 18 and 60")
  }

  const dateOfBirth = watch('dateOfBirth');
  // const confirmPassword = watch('confirmPassword');
  const password = watch('password');
  const hostel = watch('hostel');

  const validatePass = (value) => {
    return value === password || "Passwords do not match";
  }

  const calculateAge = () => {
    if(!dateOfBirth) return '';
    const dob = new Date(dateOfBirth);
    console.log("Date of Birth",dob);
    const today = new Date();
    const year = today.getFullYear() - dob.getFullYear();
    return year
  }

  console.log("Errors remaining: ", Object.keys(errors).length);
  console.log("Errors: ", errors);
  
  return (
    <div>
      <h1>Student Registration Form</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type='text'
            id='fullName'
            placeholder='Enter full name'
            {...register('fullName', {
              required: "Full name is required"
            }
            )}
          />
          {errors.fullName && <div style={{color : 'red'}} role='alert'>{errors.fullName.message}</div>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type='text'
            id='email'
            placeholder='Enter email'
            {...register('email', {
              required: "Email is required",
              pattern : {
                value : /^\S+@\S+$/i,
                message : "Invalid email"
              }
            })}
          />
          {errors.email && <div style={{color : 'red'}} role='alert'>{errors.email.message}</div>}
        </div>

        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type='date'
            id='dateOfBirth'
            {...register('dateOfBirth', {
              validate : validateAge
            })}
          />
          {errors.dateOfBirth && <div style={{color : 'red'}} role='alert'>{errors.dateOfBirth.message}</div>}
        </div>

        <div>Calculated Age: {calculateAge()}</div>

        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type='text'
            id='phoneNumber'
            {...register('phoneNumber',{
              required : "Number is required",
              pattern : {
                value : /^\d{10}$/,
                message : "Phone number must be 10 digits"
              }
            })}
          />
          {errors.phoneNumber && <div style={{color : 'red'}} role='alert'>{errors.phoneNumber.message}</div>}
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender"
          {...register('gender', {
            required : "Gender is required"
          })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <div style={{color : 'red'}} role='alert'>{errors.gender.message}</div>}
        </div>

        <div>
          <label htmlFor="course">Course</label>
          <select name="course" id="course"
          {...register('course', {
            required : "Course is required"
          })}
          >
            <option value="">Select Course</option>
            <option value="BSc">BSc</option>
            <option value="BTech">BTech</option>
            <option value="BA">BA</option>
            <option value="BCom">BCom</option>
          </select>
          {errors.course && <div style={{color : 'red'}} role='alert'>{errors.course.message}</div>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            {...register('password', {
              required: "Password is required",
              minLength : {
                value : 6,
                message : "Minimum 6 characters"
              }
            })}
          />
          {errors.password && <div style={{color : 'red'}} role='alert'>{errors.password.message}</div>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm Password'
            {...register('confirmPassword', {
              required: "Confirm Password is required",
              validate : validatePass
            })}
          />
          {errors.confirmPassword && <div style={{color : 'red'}} role='alert'>{errors.confirmPassword.message}</div>}
        </div>

        <div>
          <label htmlFor="hostel">Hostel Required</label>
          <select name="hostel" id="hostel" {...register('hostel', {
            required : "This field is required"
          })}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.hostel && <div style={{color : 'red'}} role='alert'>{errors.hostel.message}</div>}
        </div>

          {hostel === 'Yes' && (
            <div>
              <label htmlFor="hostelDetails">Hostel Details</label>
              <textarea 
              type='text'
              placeholder='Enter hostel details'
              id='hostelDetails'
              {...register('hostelDetails', {
                required : "Hostel Details required if opted for hostel"
              })}
              />
              {errors.hostelDetails && <div style={{color : 'red'}} role='alert'>{errors.hostelDetails.message}</div>}
            </div>
          )}

        <button type='submit' disabled={!isValid}>Submit</button>
      </form>
      <StudentSummary />
    </div>
  )
}

export default StudentRegistrationForm