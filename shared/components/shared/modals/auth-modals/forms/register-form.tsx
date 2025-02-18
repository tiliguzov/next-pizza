import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';

interface Props {
  onClose?: VoidFunction;
  className?: string;
}

export const RegisterForm: React.FC<Props> = ({ onClose, className }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('You have successfully registered', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('{[REGISTER] ', error);
      toast.error("Couldn't log in to account", {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className={cn('flex flex-col gap-5', className)} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Register an account" size="md" className="font-bold" />
            <p className="text-gray-400"> Write your email and full name, to enter the account </p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Full Name" required />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="confirmPassword" label="Confirm Password" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
