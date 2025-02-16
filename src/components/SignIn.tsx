'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaGoogle } from "react-icons/fa"

export default function SignIn() {
  // Supabaseクライアント作成
  const supabase = createClientComponentClient();

  // サインイン処理
  const handleSignInWithGoogle = async () => {
    // GitHub OAuthで認証する
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          ログイン
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleSignInWithGoogle}
        >
          <FaGoogle className="mr-2 h-4 w-4" />
          Googleでログイン
        </Button>
        {/* <Button variant="outline" className="w-full">
          <FaApple className="mr-2 h-4 w-4" />
          Sign in with Apple
        </Button>
        <Button variant="outline" className="w-full">
          <MdEmail className="mr-2 h-4 w-4" />
          Sign in with Email
        </Button> */}
      </CardContent>
    </Card>
  );
}

