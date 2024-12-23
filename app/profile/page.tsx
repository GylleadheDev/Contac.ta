'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Profile() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [username , setUsername] = useState()

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/signin');
        return;
      }
      setUser(user);
      

      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();


      if (profile?.avatar_url) {
        setAvatarUrl(profile.avatar_url);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/auth/signin');
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const handleUpdateAvatar = async () => {
    if (!newAvatar || !user) return;
    setLoading(true);

    try {
      const fileExt = newAvatar.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, newAvatar, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
          username: username, // Include username here
        });

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast({
        title: 'Profile updated',
        description: 'Your profile picture has been updated successfully.',
      });
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

  return (
    <div className="min-h-screen ">
      <Navbar user={user} avatarUrl={avatarUrl} />
      
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">{username}</h1>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-28 w-28">
                <AvatarImage className=''  src={avatarUrl} alt="Profile" />
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-2 w-full">
                <Label htmlFor="avatar">Profile Picture</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="cursor-pointer"
                />
                {newAvatar && (
                  <Button
                    onClick={handleUpdateAvatar}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Updating...' : 'Update Profile Picture'}
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email} disabled />
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}