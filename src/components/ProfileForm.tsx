'use client';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ProfileSkeleton from './Skeletons/ProfileSkeleton';
import { InputField } from './form/InputField';
import { SelectField } from './form/SelectField';
import { TextareaField } from './form/TextareaField';
import { useHandleError } from "../lib/hook/useToastHandlers";
import {
  useUserService,
} from "../lib/service/userService";
import Image from 'next/image';
import { ProfileFormInputs } from '@/type';


const ACCOUNT_TYPES = ['Individual', 'Business', 'Enterprise', 'Non-Profit'];

export default function ProfileForm() {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleError = useHandleError();
  const { useGetProfile,
    useUpdateProfile,
    useUploadImage, } = useUserService();

  const { data, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const uploadImage = useUploadImage();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      accountType: 'Individual',
      profileImage: '',
    },
  });

  const profileImage = watch('profileImage');
  const name = watch('name');

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';


  useEffect(() => {
    if (data?.success && data.data) {
      const d = data.data;

      reset({
        name: d.name || "",
        email: d.email || "",
        phoneNumber: d.phoneNumber || "",
        address: d.address || "",
        accountType: d.accountType || "Individual",
        profileImage: d.profileImage || "",
      });
    }
  }, [data, reset]);


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      handleError("Invalid file type");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      handleError("File must be under 5MB");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);

    try {
      setUploading(true);

      const res = await uploadImage.mutateAsync(fd);
      
      if (res.success) {
        setValue("profileImage", res.data.url, {
          shouldDirty: true,
        });
      }
    } catch (err: any) {
      handleError(err, "Upload failed");
    } finally {
      setUploading(false);
    }
  };


  const onSubmit = async (formData: ProfileFormInputs) => {
    await updateProfile.mutateAsync(formData);
  };


  const isBusy = isSubmitting || uploading;

  if (isLoading) return <ProfileSkeleton />;

  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="animate-fade-in">

        <div className="flex items-center gap-4 mb-7">
          <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-[#fef3f0] border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
            <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden bg-[#fef3f0] border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-[#E84B2A]">{initials}</span>
              )}
            </div>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isBusy}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isBusy}
              className="flex items-center gap-2 px-3.5 py-2 rounded-md border border-[#BDB1FF] bg-[#ECE8FF] text-[14px] font-semibold text-gray-700 hover:border-[#1F1844] hover:text-[#1F1844] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <div className="w-3 h-3 rounded-full border-2 border-gray-200 border-t-[#1F1844] animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload Profile Image
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

          <InputField
            label="Business Name"
            id="name"
            register={register}
            error={errors.name?.message}
            placeholder="e.g. Tech Innovators Ltd."
            disabled={isBusy}
            required
          />

          <InputField
            label="Business Email"
            id="email"
            type="email"
            register={register}
            error={errors.email?.message}
            placeholder="you@company.com"
            disabled={isBusy}
            required
          />

          <InputField
            label="Phone Number"
            id="phoneNumber"
            register={register}
            error={errors.phoneNumber?.message}
            placeholder="e.g. +1 234 567 8900"
            disabled={isBusy}
          />

          <SelectField
            label="Account Type"
            id="accountType"
            control={control}
            options={ACCOUNT_TYPES}
            disabled={isBusy}
          />
        </div>


        <div className="mb-7">
          <TextareaField
            label="Address"
            id="address"
            register={register}
            placeholder="118, Elsie Femi Pearse Street, Off Akin Adesola Street, V/Island, Lagos"
            disabled={isBusy}
          />
        </div>


        <button
          type="submit"
          disabled={isBusy || !isDirty}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-semibold text-white transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ backgroundColor: isBusy || !isDirty ? '#4b4d6e' : '#1F1844' }}
          onMouseEnter={e => { if (!isBusy && isDirty) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#16123a'; }}
          onMouseLeave={e => { if (!isBusy && isDirty) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1F1844'; }}
        >
          {isSubmitting ? (
            <>
              <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Saving…
            </>
          ) : 'Save Changes'}
        </button>
      </form>
    </>
  );
}