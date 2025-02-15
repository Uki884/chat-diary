import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaGoogle, FaApple } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function SignIn() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <img src="/logo.svg" alt="App Logo" className="h-12 w-auto" />
        </div>
        <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
        <CardDescription className="text-center">Choose your preferred sign-in method</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button variant="outline" className="w-full">
          <FaGoogle className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
        <Button variant="outline" className="w-full">
          <FaApple className="mr-2 h-4 w-4" />
          Sign in with Apple
        </Button>
        <Button variant="outline" className="w-full">
          <MdEmail className="mr-2 h-4 w-4" />
          Sign in with Email
        </Button>
      </CardContent>
    </Card>
  )
}

