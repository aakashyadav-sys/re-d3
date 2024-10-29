'use client';

import React, { useState } from 'react';
import './login.css';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { login } from '@/services/fetchData';

export const LoginSection = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({ email_id: '', password: '' });
  const [errors, setErrors] = useState({ email_id: '', password: '' });

  const resetForm = () => {
    setFormData({ email_id: '', password: '' });
    setErrors({ email_id: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email_id: '', password: '' };

    if (!formData.email_id) {
      newErrors.email_id = 'Username required';
    }
    if (!formData.password) {
      newErrors.password = 'Password required';
    }

    if (newErrors.email_id || newErrors.password) {
      setErrors(newErrors);
      return;
    }
        try {
          const res = await login(formData);
          if(res.successMessge) {
            toast.success(res.successMessge);
            router.push('/customerPortal/')
          } else {
            toast.error(res?.errorMessage);
          }

    } catch (err) { 
      resetForm();
      return err;
    } finally {
        resetForm();
    }

  };

  return (
    <section className="form-section-main">
      <div className="container">
        <div data-aos="fade-down" data-aos-duration="6000" className="flex justify-between">
          <div className="form-left">
            <div className="banner-title">
              <h1>CUSTOMER LOGIN</h1>
            </div>

            <div className="login-form">
              <form id="login-form" onSubmit={(e) =>handleSubmit(e)}>
                <div className="form-name">
                  <label htmlFor="email_id">User Name</label>
                  <input
                    type="text"
                    id="email_id"
                    placeholder="John Lennon"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleChange}
                    required
                  />
                  {errors.username && (
                    <div className="error-field">
                      <p>{errors.email_id}</p>
                    </div>
                  )}
                </div>

                <div className="form-password">
                  <label htmlFor="fpassword">Password</label>
                  <input
                    type="password"
                    id="pname"
                    placeholder="*****"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <div className="error-field">
                      <p>{errors.password}</p>
                    </div>
                  )}
                </div>

                <div className="form-log-in">
                  <input type="submit" id="f-login" value="LOG IN" />
                </div>
              </form>
            </div>
          </div>

          <div className="form-right relative">
            <Image src="/assets/LOGIN-Resize.png" alt="login-img" loading='lazy' width={300} height={300}  />

            <div className="image-bottom">
              <Image
                loading="lazy"
                src="/assets/dotted-new.png"
                alt="login-img"
                width="925"
                height="691"
                className="absolute w-[100px] bottom-0 left-[-28px] z-[-1]"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
