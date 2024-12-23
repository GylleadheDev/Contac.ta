'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [username , setUsername] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (signUpError) throw signUpError;
  
      if (avatar && authData.user) {
        const fileExt = avatar.name.split('.').pop();
        const filePath = `${authData.user.id}/avatar.${fileExt}`;
  
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatar);
  
        if (uploadError) throw uploadError;
  
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
  
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            avatar_url: publicUrl,
            username: username, // Include username here
          });
  
        if (updateError) throw updateError;
      } else {
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            username: username, // Include username here
          });
  
        if (updateError) throw updateError;
      }
  
      toast({
        title: 'Account created successfully!',
        description: 'Please verify your Email link.',
        variant: 'success',
      });
  
      router.push('/auth/verify');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  return (


<div className="min-h-screen  flex-col antialiased bg-gradient-to-tl from-slate-100 transition-all ease-linear to-slate-200 dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-950 flex items-center justify-center p-4">
<a
         href="/"
         className="flex justify-center items-center font-bold text-4xl md:text-5xl  mb-8"
       >
         <span className="text-cyan-600 dark:text-cyan-600">Con</span>
         <span className="text-[#E1785F] dark:text-[#C2CEC4]">tac</span>
         <span className="text-gray-700 dark:text-[#E1785F]">.ta</span>
       </a>
<div className="max-w-md w-full  rounded-xl shadow-2xl p-8">
 <h2 className="text-2xl font-bold text- mb-6 text-center">
   Create you account with Us!!
 </h2>

 <form className="space-y-4 " onSubmit={handleSignUp}>
   <div>
     <label className="block text-sm font-medium  mb-1">
       Email
     </label>
     <input
     
     id="email"
     type="email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     required
       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2  outline-none transition-all"
       placeholder="your@email.com"
     />
   </div>

   <div>
     <label className="block text-sm font-medium  mb-1">
       Username
     </label>
     <input
      type="text"
      value={username}
      onChange={handleUsernameChange}
       required
       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2  outline-none transition-all"
       placeholder="Your username"
     />
   </div>

   <div>
     <label className="block text-sm font-medium  mb-1">
       Password
     </label>
     <input
       id="password"
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       required
       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2  outline-none transition-all"
       placeholder="••••••••"
     />
   </div>

 

  
  

          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white dark:text-slate-900  font-medium py-2.5 rounded-lg transition-colors" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
 </form>

<div className="mt-6 text-center">
<p className="text-sm text-muted-foreground">
  Already have an account?{' '}
  <Link href="/auth/signin" className="text-primary hover:underline">
    Sign In
  </Link>
</p>
</div>
</div>
</div>
  );
}